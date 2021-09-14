'use strict';

const container = document.querySelector('.container');
const display = document.querySelector('.display');
const btn = document.querySelectorAll('.btn');
const btnOperation = document.querySelectorAll('.btn-operation');
const btnLight = document.querySelector('.btn-light');
const btnClear = document.querySelector('.btn-clear');
const btnEquals = document.querySelector('.btn-equal');
const btnDelete = document.querySelector('.btn-back');
const btnDarkMode = document.querySelector('.fas');
const previousOperandTextEl = document.querySelector('.previous-operand');
const currentOperandTextEl = document.querySelector('.current-operand');

class Calculator {
  constructor(previousOperandTextEl, currentOperandTextEl) {
    this.previousOperandTextEl = previousOperandTextEl;
    this.currentOperandTextEl = currentOperandTextEl;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -2);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      case '%':
        computation = prev % current;
        break;

      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigit = parseFloat(stringNumber.split('.')[0]);
    const decimalDigit = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigit)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigit.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigit != null) {
      return `${integerDisplay}.${decimalDigit}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextEl.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextEl.innerText = this.previousOperand;
    } else {
      this.previousOperandTextEl.innerHTML = '';
    }
  }
}

const calculator = new Calculator(previousOperandTextEl, currentOperandTextEl);

btnDarkMode.addEventListener('click', function () {
  if (btnDarkMode.classList.contains('fa-moon')) {
    btnDarkMode.classList.add('fa-sun');
    btnDarkMode.classList.remove('fa-moon');
  } else {
    btnDarkMode.classList.add('fa-moon');
    btnDarkMode.classList.remove('fa-sun');
  }
  container.classList.toggle('container-dark');
  display.classList.toggle('display-dark');
  btn.forEach(btn => btn.classList.toggle('btn-dark'));
  btnLight.forEach(btn => btn.classList.toggle('btn-light-dark'));
});

btn.forEach(button => {
  button.addEventListener('click', function () {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

btnOperation.forEach(button => {
  button.addEventListener('click', function () {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

btnEquals.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

btnClear.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

btnDelete.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});
