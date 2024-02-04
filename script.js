const container = document.querySelector(".container");
const themeEl = document.querySelector(".theme");
const display = document.querySelector(".display");
const prevDisplay = document.querySelector(".prev-display");
const solDisplay = document.querySelector(".solution-display");
const btnsEl = document.querySelector(".btns");
const opBtns = document.querySelectorAll(".op");
const op2Btns = document.querySelectorAll(".op2");
const digits = document.querySelectorAll(".digit");
let allowDecim = true;

let state = {
  opA: "",
  opB: "",
  operator: "",
  result: 0,
  operatorIndex: "",
};
let operatorNum = [];
const operators = ["+", "-", "x", "÷"];

themeEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const target = e.target;
    const shadowStyle = target.getAttribute("data-box-shadow");
    const bgColorStyle = target.getAttribute("data-bgcolor");

    localStorage.setItem('bxShadow', JSON.stringify(shadowStyle));
    localStorage.setItem('bgColor', JSON.stringify(bgColorStyle));

    target.classList.add("clicked");
    setTimeout(function () {
      target.classList.remove("clicked");
    }, 200);

    container.style.boxShadow = shadowStyle;
    opBtns.forEach((op) => {
      op.style.backgroundColor = bgColorStyle;
    });
  }
});

const displayNum = function (e) {
  if (e.target.classList.contains("digit")) {
    const target = e.target;

    if (solDisplay.textContent.split("").length >= 9)
      solDisplay.style.fontSize = "1.5rem";
    if (solDisplay.textContent.split("").length >= 39) return;

    prevDisplay.style.opacity = "0.7";
    solDisplay.style.opacity = "1";

    solDisplay.textContent += target.textContent;
  }
};

const clearState = function () {
  state.opA = "";
  state.opB = "";
  state.operator = "";
  state.operatorIndex = "";
  state.result = 0;
};

const clearDis = function (e) {
  if (e.target.classList.contains("clear")) {
    solDisplay.style.fontSize = "3rem";
    solDisplay.style.opacity = "1";
    solDisplay.textContent = "";

    prevDisplay.style.opacity = "0";
    prevDisplay.textContent = "";

    clearState();
    allowDecim = !allowDecim;
  }
};

const deleteNum = function (e) {
  if (e.target.classList.contains("del")) {
    solDisplay.textContent = solDisplay.textContent.slice(0, -1);

    if (solDisplay.textContent.split("").length < 9)
      solDisplay.style.fontSize = "3rem";
  }
};

const addNegative = function (e) {
  if (e.target.classList.contains("neg")) {
    solDisplay.textContent
      ? (solDisplay.textContent = -solDisplay.textContent)
      : "";
  }
};

const addDecimal = function (e) {
  if (e.target.classList.contains("decim")) {
    if (allowDecim) {
      solDisplay.textContent += ".";
      allowDecim = !allowDecim;
    }
  }
};

const addOp = function (e) {
  if (e.target.classList.contains("op")) {
    const target = e.target;

    allowDecim = true;

    if (solDisplay.textContent === "") {
      return;
    } else {
      solDisplay.textContent += target.textContent;
    }
    prevDisplay.style.opacity = "0.7";
    solDisplay.style.opacity = "1";
  }
};

const extractExpression = function (arr) {
  let firstOperand = [];
  while (arr.length > 0 && !"+-x÷".includes(arr[0])) {
    firstOperand.push(arr.shift());
  }

  const operator = arr.shift();

  let secondOperand = [];
  while (arr.length > 0 && !"+-x÷".includes(arr[0])) {
    secondOperand.push(arr.shift());
  }

  return [firstOperand.join(""), operator, secondOperand.join("")];
};

const equals = function (e) {
  if (e.target.classList.contains("eq")) {
    prevDisplay.style.opacity = "0.5";
    prevDisplay.style.fontSize = "2rem";
    prevDisplay.textContent = solDisplay.textContent.replace("=", "");

    solDisplay.textContent = "";

    const operation = prevDisplay.textContent.split("");

    operation.forEach((operand, i) => {
      operators.forEach((operator) => {
        if (operand === operator) {
          operatorNum.push(operator);
          state.operatorIndex = i;
          state.operator = operand;
        }
      });
    });

    if (operatorNum.length === 1) {
      state.opA = operation.slice(0, state.operatorIndex).join("");
      state.opB = operation.slice(state.operatorIndex + 1).join("");

      operate(state.opA, state.opB, state.operator);
      operatorNum = [];
    }

    if (operatorNum.length > 1) {
      for (let i = 0; i < operatorNum.length; i++) {
        let newOp = extractExpression(operation);

        state.opA = +newOp[0];
        state.operator = newOp[1];
        state.operatorIndex = 1;
        state.opB = +newOp[2];


        const newVal = operate(state.opA, state.opB, state.operator);
        operation.unshift(newVal);

        state.result = newVal;
        solDisplay.textContent = +Number.isInteger(state.result)
        ? +state.result
        : +state.result.toFixed(1);;
        console.log(state);
      }
      operatorNum = [];
    }
  }
};

const add = function (a, b) {
  if (operatorNum.length === 1) {
    state.result = +a + +b;
    solDisplay.textContent = +Number.isInteger(state.result)
      ? +state.result
      : +state.result.toFixed(1);
  }

  if (operatorNum.length > 1) {
    state.result = +a + +b;
    return a + b;
  }
};

const subs = function (a, b) {
  if (operatorNum.length === 1) {
    state.result = +a - +b;
    solDisplay.textContent = +Number.isInteger(state.result)
      ? +state.result
      : +state.result.toFixed(1);
  }

  if (operatorNum.length > 1) {
    state.result = +a - +b;
    return a - b;
  }
};

const multi = function (a, b) {
  if (operatorNum.length === 1) {
    state.result = +a * +b;
    solDisplay.textContent = +Number.isInteger(state.result)
      ? +state.result
      : +state.result.toFixed(1);
  }

  if (operatorNum.length > 1) {
    state.result = +a * +b;
    return a * b;
  }
};

const devide = function (a, b) {
  if (operatorNum.length === 1) {
    state.result = +a / +b;
    solDisplay.textContent = +Number.isInteger(state.result)
      ? +state.result
      : +state.result.toFixed(1);
  }

  if (operatorNum.length > 1) {
    state.result = +a / +b;
    return a / b;
  }
};

const operate = function (a, b, o) {
  if (!a && !b && !o) return;

  if (o === "+") {
    return add(a, b);
  }
  if (o === "-") {
    return subs(a, b);
  }
  if (o === "x") {
    return multi(a, b);
  }
  if (o === "÷") {
    return devide(a, b);
  }
};

btnsEl.addEventListener("click", (e) => {
  clearDis(e);
  deleteNum(e);
  displayNum(e);
  addOp(e);
  addNegative(e);
  addDecimal(e);
  equals(e);
});

window.addEventListener('load', ()=>{
  let shadowStyle = localStorage.getItem('bxShadow');
  shadowStyle = JSON.parse(shadowStyle);
  
  let bgColorStyle = localStorage.getItem('bgColor');
  bgColorStyle = JSON.parse(bgColorStyle);
  
  container.style.boxShadow = shadowStyle;
  opBtns.forEach((op) => {
  op.style.backgroundColor = bgColorStyle;
  });
  })