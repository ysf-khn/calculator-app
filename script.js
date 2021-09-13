'use strict';

const container = document.querySelector('.container');
const display = document.querySelector('.display');
const btn = document.querySelectorAll('.btn');
const btnLight = document.querySelector('.btn-light');
const btnClear = document.querySelector('.btn-clear');
const btnEquals = document.querySelector('.btn-equal');
const btnBack = document.querySelector('.btn-back');
const btnDarkMode = document.querySelector('.fas');

const operators = ['÷', '×', '+', '−'];

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

btnBack.addEventListener('click', function () {
  if (display.innerHTML) display.innerHTML = display.innerHTML.slice(0, -1);
});

btnClear.addEventListener('click', () => (display.innerHTML = ''));

for (const button of btn) {
  button.addEventListener('click', function () {
    if (button !== btnClear && button !== btnEquals && button !== btnBack)
      display.innerHTML += button.innerHTML;
  });
}

btnEquals.addEventListener('click', () => {
  let solve = display.innerHTML.replace('=', '');
  if (!solve) display.innerHTML = 'Error';
  // const html = `${eval(solve)}`;

  console.log(eval(solve));
});
