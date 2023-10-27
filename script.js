const resultInput = document.getElementById('result');

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
  const key = event.key;

  if (/[0-9]/.test(key)) {
    appendNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendOperator(key);
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Escape') {
    clearResult();
  } else {
    alert('Only numbers are allowed');
  }
}

function appendNumber(number) {
  resultInput.value += number;
}

function appendOperator(operator) {
  resultInput.value += operator;
}

function clearResult() {
  resultInput.value = '';
}

function calculateResult() {
  try {
    resultInput.value = eval(resultInput.value);
  } catch (error) {
    resultInput.value = 'Error';
  }
}