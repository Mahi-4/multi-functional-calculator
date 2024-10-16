const display = document.querySelector("#display");

const addOperator = (operator) => {
 if (display.value !== "" && !isOperator(display.value[display.value.length - 1])) {
  display.value += operator;
 }
}

const isOperator = (character) => {
 return character === '+' || character === '+' || character === '-' || character === '*' || character === '/' || character === '.';
}

const calculate = () => {
 try {
  if (display.value !== '') {
   display.value = eval(display.value);
  }
 } catch (error) {
  display.value += '';
 }
}