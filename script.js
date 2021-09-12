'use strict';

const display = document.querySelector('.display');
const btn = document.querySelectorAll('.btn');
const equalsBtn = document.querySelector('.btn-equal');

const operators = ['÷', '×', '+', '−'];

for (const button of btn) {
  button.addEventListener('click', () => {
    display.innerHTML += button.innerHTML;
  });
}

equalsBtn.addEventListener('click', () => {
  const solve = display.innerHTML.replace('=', '');
  console.log(solve);

  if (
    solve.includes('+') ||
    solve.includes('−') ||
    solve.includes('×') ||
    solve.includes('÷') ||
    solve.includes('%')
  )
    console.log(solve.split());
});
