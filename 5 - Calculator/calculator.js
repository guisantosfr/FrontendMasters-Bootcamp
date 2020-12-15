let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector('.screen');

function buttonClick(value){
  isNaN(parseInt(value)) ? handleSymbol(value) : handleNumber(value);
  
  screen.innerText = buffer;
}

function handleSymbol(symbol){
  switch(symbol){
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if(previousOperator === null){
        return;
      }

      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "←":
      buffer.length === 1 ? buffer = '0' : buffer = buffer.substring(0, buffer.length - 1);
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleNumber(numberString){
  buffer === "0" ? buffer = numberString : buffer += numberString;
}

function handleMath(symbol){
  if(buffer === '0'){
    return;
  }

  const intBuffer = parseInt(buffer);

  if(runningTotal == 0){
    runningTotal = intBuffer;
  }
  else{
    flushOperation(intBuffer);
  }

  previousOperator = symbol;
  buffer = '0';
}

function flushOperation(intBuffer){
  if(previousOperator === "+")
    runningTotal += intBuffer;
  else if(previousOperator === "-")
    runningTotal -= intBuffer;
  else if(previousOperator === "×")
    runningTotal *= intBuffer;
  else
    runningTotal /= intBuffer; 
}


function init(){
  document.querySelector('.calc-buttons')
    .addEventListener('click', event => buttonClick(event.target.innerText));
}

init();