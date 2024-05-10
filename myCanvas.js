//
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

document.addEventListener("DOMContentLoaded", function () {
	function resizeCanvas() {
		canvas.width = window.innerWidth * 0.9; // 90% of window-width
		canvas.height = window.innerHeight * 0.8; // 80% of window-height
	}

	resizeCanvas(); // set canvas size when it is initialized.

	let isDrawing = false;

	function startDrawing(e) {
		isDrawing = true;
		draw(getMousePos(e));
		e.preventDefault(); // disable touch operation
	}

	function stopDrawing() {
		isDrawing = false;
		context.beginPath();
	}

	function draw(pos) {
		if (!isDrawing) return;

		// draw a line
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

	// add the button-click event
	const clearButton = document.getElementById("clear-button");
	clearButton.addEventListener("click", function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	});

	// resize a canvas when a window is resized
	window.addEventListener("resize", resizeCanvas);
});

// Function to clear the canvas
function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}
