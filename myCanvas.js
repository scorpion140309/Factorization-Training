document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth * 0.9; // ウィンドウの幅の90%
        canvas.height = window.innerHeight * 0.8; // ウィンドウの高さの80%
    }

    resizeCanvas(); // 初期化時にキャンバスのサイズを設定

    let isDrawing = false;

    function startDrawing(e) {
        isDrawing = true;
        draw(getMousePos(e));
        e.preventDefault(); // ブラウザのデフォルトのタッチ操作を無効化
    }

    function stopDrawing() {
        isDrawing = false;
        context.beginPath();
    }

    function draw(pos) {
        if (!isDrawing) return;

        // 線を描画
        context.lineTo(pos.x, pos.y);
        context.stroke();
        context.beginPath();
        context.moveTo(pos.x, pos.y);
    }

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX || e.touches[0].clientX) - rect.left),
            y: Math.round((e.clientY || e.touches[0].clientY) - rect.top)
        };
    }

    canvas.addEventListener("mousedown", function (e) {
        startDrawing(e);
    });
    canvas.addEventListener("touchstart", function (e) {
        startDrawing(e);
    });
    canvas.addEventListener("mousemove", function (e) {
        draw(getMousePos(e));
    });
    canvas.addEventListener("touchmove", function (e) {
        draw(getMousePos(e));
    });
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("touchend", stopDrawing);

    // Clearボタンのクリックイベントを追加
    const clearButton = document.getElementById("clear-button");
    clearButton.addEventListener("click", function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });

    // ウィンドウサイズが変更されたときにキャンバスのサイズを更新する
    window.addEventListener("resize", resizeCanvas);
});
