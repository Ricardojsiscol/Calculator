//Operation functions
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
	if (num2 == 0)
		return 'Not allowed!';
	else
		num1 / num2;}

//Handles event listener related to calculator input's behaviour
function inputEventListener(){
	document.getElementById('input').addEventListener('input', function(){
		this.value = this.value.replace(/[^0-9.]/g, '');
})
}

//Handles functionality of equal symbol button
function equalSymbolEventListener(operands){
	const equalButton = document.getElementById('equal_sign');
	equalButton.addEventListener('click', () => {
		if (!operands.num1){
			return ;
		}
		operands.num2 = document.getElementById('input').value;
		document.getElementById('input').value = operate(operands);
		operands.num1 = '';
		operands.num2 = '';
		operands.operator = '';
		operands.operatorClicked = false;
	})
}
//Handles operations depending on the operator chosen
function operate(operands){
	switch (operands.operator){
		case '+':
			return add(operands.num1, operands.num2);
		case '-':
			return subtract(operands.num1, operands.num2);
		case 'x':
			return multiply(operands.num1, operands.num2);
		case '/':
			return divide(operands.num1, operands.num2);
	}
}

//Handles functionality of calculator's operator buttons
function operatorEventListener(operands){
	const operators = Array.from(document.getElementsByClassName('operators'));
	const input = document.getElementById('input'); 
	operators.forEach(operator => {
		operator.addEventListener('click', () => {
			if (!operands.operatorClicked){
				if(operands.num1 == '')
					operands.num1 = parseFloat(input.value);
				else if (operands.num2 == ''){
					operands.num2 = parseFloat(input.value);
					operands.num1 = operate(operands);
					input.value = operands.num1;
					operands.operator = operator.textContent;
					operands.num2 = '';
				}
			}	
			operands.operator = operator.textContent;
			operands.operatorClicked = true;
		})	
	})
}

//Handles functionality of calculator's digit buttons
function digitEventListener(operands){
	const inputElement = document.getElementById('input');
	const digits = Array.from(document.getElementsByClassName('digits'));
	digits.forEach(digit => {
		digit.addEventListener('click', () => {
			if (operands.operatorClicked){
				inputElement.value = '';
				operands.operatorClicked = false;
			}
			else if (inputElement.value == '0')
				inputElement.value = '';
			inputElement.value += digit.textContent;
		})
	})
}

//Handles functionality of calculator's buttons: del and AC
function specialBEventListener(operands){
	const specials = Array.from(document.getElementsByClassName('special'));
	for (let special of specials){
		special.addEventListener('click', () => {
			if (special.textContent === 'del'){
				let input = Array.from(document.getElementById('input').value);
				input.pop();
				document.getElementById('input').value = input.join('');
			}
			else if (special.textContent === 'AC'){
				document.getElementById('input').value = '0';
				operands.num1 = '';
				operands.num2 = '';
				operands.operator = '';
				operands.operatorClicked = false;
			}
		})
	}
}

//Sets up all event listeners
function setEventListeners(){
	let operands = {num1: '', num2: '', operator: '', operatorClicked: false};
	inputEventListener();
	digitEventListener(operands);
	operatorEventListener(operands);
	equalSymbolEventListener(operands);
	specialBEventListener(operands);
}
setEventListeners();