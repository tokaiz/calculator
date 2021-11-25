class Calculator {
	constructor(previousDisplay, currentDisplay) {
		this.previousDisplay = previousDisplay;
		this.currentDisplay = currentDisplay;
		this.deleteAll();
	}
	
	deleteAll() {
		this.current = '';
		this.previous = '';
		this.operation = undefined;
	}
	
	delete() {
		this.current = this.current.slice(0, -1);
	}
	
	addNumber(number) {
		if (number == '.' && this.current.includes('.')) return;
		this.current = this.current.toString() + number.toString();
	}
	
	chooseOperation(operation) {
		if (this.current === '') return;
		if (this.previous !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previous = this.current;
		this.current = '';
	}
	
	compute() {
		let result
		const before = parseFloat(this.previous);
		const now = parseFloat(this.current);
		if (isNaN(before) || (isNaN(now))) return;
		switch (this.operation) {
			case '+':
				result = before + now;
				break;
			case '−':
				result = before - now;
				break;
			case '÷':
				result = before / now;
				break;
			case '×':
				result = before * now;
				break;
			default:
				return;
		}
		this.current = result;
		this.previous = '';
		this.operation = undefined;
	}
	
	getDisplay(number) {
		let str = number.toString();
		let int = parseFloat(str.split('.')[0]);
		let display
		if (isNaN(int)) {
			display = '';
		} else {
			display = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		return display;
	}
	
	updateDisplay() {
		this.currentDisplay.innerText = this.getDisplay(this.current);
		if (this.operation != null) {
			this.previousDisplay.innerText = `${this.getDisplay(this.previous)} ${this.operation}`;
		} else {
			this.previousDisplay.innerText = '';
		}
	}
}


//defining all button to variable
const numberButton = document.querySelectorAll('[number]');
const operationButton = document.querySelectorAll('[operation]');
const deleteButton = document.querySelector('[delete]');
const allClearButton = document.querySelector('[all-clear]');
const equalButton = document.querySelector('[equal]');
const previousDisplay = document.querySelector('[previous]');
const currentDisplay = document.querySelector('[current]');

//calling the class above
const calculator = new Calculator(previousDisplay, currentDisplay);


//function for tracking the pressed number button (0 - 9)
numberButton.forEach(button => {
	button.addEventListener('click', () => {
		calculator.addNumber(button.innerText);
		calculator.updateDisplay();
	});
});

//function for tracking the pressed operation button (+ - / *)
operationButton.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

//function to compute the number using equal button (=)
equalButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
});

//function for allClear button (AC)
allClearButton.addEventListener('click', button => {
	calculator.deleteAll();
	calculator.updateDisplay();
});

//function for delete button (DEL)
deleteButton.addEventListener('click', button => {
	calculator.delete();
	calculator.updateDisplay();
});