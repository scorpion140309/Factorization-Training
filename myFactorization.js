// Variable to track if the answer is shown
let isAnswerShown = false;
// Strings to store factored and quadratic expressions
let factoredExpression = "";
let quadraticExpression = "";

// Function to find the greatest common divisor
function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}

// Function to generate a random non-zero number
function generateRandomNonZero() {
    let num;
    do {
        num = Math.floor(Math.random() * 15) - 7;
    } while (num === 0);
    return num;
}

// Function to generate a pair of numbers with a coprime relationship
function generatePair() {
    let num1, num2;
    do {
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = generateRandomNonZero();
    } while (gcd(num1, num2) !== 1);
    return { slope: num1, intercept: num2 };
}

// Function to generate a factoring problem with quadratic expressions
function generateFactoringProblem() {
    const { slope: a, intercept: b } = generatePair();
    const { slope: c, intercept: d } = generatePair();

	const coef_2 = a * c
    if (coef_2 !== 1) {
        quadraticExpression += (coef_2) + "x^2";
    } else {
        quadraticExpression += "x^2";
    }

	const coef_1 = (a * d) + (b * c);
    if (coef_1 !== 0) {
        quadraticExpression += " ";
        if (coef_1 > 0) {
            quadraticExpression += "+";
        }
		if (coef_1 === 1) {
			quadraticExpression += "x";
		} else if (coef_1 === -1){
			quadraticExpression += "-x";
		} else {
			quadraticExpression += ((a * d) + (b * c)) + "x";
		}
    }

    if (b * d !== 0) {
        quadraticExpression += " ";
        if (b * d > 0) {
            quadraticExpression += "+";
        }
        quadraticExpression += (b * d);
    }

    factoredExpression += "(";
    if (a !== 1 && a !== -1) {
        factoredExpression += a;
    } else if (a === -1) {
        factoredExpression += "-";
    }
    factoredExpression += "x";

    if (b !== 0) {
        factoredExpression += (b > 0 ? "+" : "") + b;
    }

    factoredExpression += ")(";

    if (c !== 1 && c !== -1) {
        factoredExpression += c;
    } else if (c === -1) {
        factoredExpression += "-";
    }
    factoredExpression += "x";

    if (d !== 0) {
        factoredExpression += (d > 0 ? "+" : "") + d;
    }

    factoredExpression += ")";
}

// Function to display the problem and its answer
function displayProblemAndAnswer() {
    // Writing equations in TeX format for rendering with MathJax
    const problemElement = document.getElementById("problem");
    problemElement.innerHTML = "\\[" + quadraticExpression + "\\]";

    const answerElement = document.getElementById("answer");
    answerElement.innerHTML = isAnswerShown ? "\\[" + factoredExpression + "\\]" : "\\[\\]";

    MathJax.typeset();
}

// Function to toggle the visibility of the answer
function toggleAnswer() {
    isAnswerShown = !isAnswerShown;
    displayProblemAndAnswer();
}

// Function to generate a new factoring problem and its answer
function generateProblemAndAnswer() {
    quadraticExpression = "";
    factoredExpression = "";
    generateFactoringProblem();
    displayProblemAndAnswer();
}

// Display the initial problem and answer
generateProblemAndAnswer();
