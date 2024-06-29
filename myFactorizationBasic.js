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
	const range_half = 16;
	let num = Math.floor(Math.random() * (2 * range_half)) - range_half;
	if (num >= 0)
	{
		num++;
	}
	return num;
}

// Function to generate a pair of numbers with a coprime relationship
function generatePair() {
	let num1, num2;
	//do {
		//num1 = Math.floor(Math.random() * 5) + 1;
		num1 = 1;
		num2 = generateRandomNonZero();
	//} while (gcd(num1, num2) !== 1);
	return { slope: num1, intercept: num2 };
}

//
function generateAnswerNormal(a, b, c, d){
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

//
function generateAnswer2(a, b){
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

	factoredExpression += ") ^ 2";
}

// Function to generate a factoring exercise with quadratic expressions
function generateFactoringExercise() {
	const { slope: a, intercept: b } = generatePair();
	let c = 1, d = 1;
	do {
		const { slope: tmp_c, intercept: tmp_d } = generatePair();
		c = tmp_c;
		d = tmp_d;
	} while (c == d);

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
	
	//
	if (a != c || b != d) {
		generateAnswerNormal(a, b, c, d);
	} else {
		generateAnswer2(a, b);
	}
}

// Function to display the exercise and its answer
function displayExerciseAndAnswer() {
	// Writing equations in TeX format for rendering with MathJax
	const problemElement = document.getElementById("exercise");
	problemElement.innerHTML = "\\[" + quadraticExpression + "\\]";

	const answerElement = document.getElementById("answer");
	answerElement.innerHTML = isAnswerShown ? "\\[" + factoredExpression + "\\]" : "\\[\\]";

	MathJax.typeset();
}

// Function to toggle the visibility of the answer
function toggleAnswer() {
	isAnswerShown = !isAnswerShown;
	displayExerciseAndAnswer();
}

// Function to generate a new factoring exercise and its answer
function generateExerciseAndAnswer() {
	quadraticExpression = "";
	factoredExpression = "";
	generateFactoringExercise();
	displayExerciseAndAnswer();
}

// Function to generate a new exercise and its answer and hide the answer
function resetAllFomula() {
	isAnswerShown = false;
	displayExerciseAndAnswer();
}

// Display the initial exercise and answer
generateExerciseAndAnswer();
