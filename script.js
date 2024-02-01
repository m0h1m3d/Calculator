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
};

themeEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const target = e.target;
    const shadowStyle = target.getAttribute("data-box-shadow");
    const bgColorStyle = target.getAttribute("data-bgcolor");

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
  if (
    e.target.classList.contains("digit") ||
    e.target.classList.contains("op")
  ) {
    const target = e.target;

    if (solDisplay.textContent.split("").length >= 9)
      solDisplay.style.fontSize = "1.5rem";
    if (solDisplay.textContent.split("").length >= 39) return;

    solDisplay.textContent += target.textContent;
  }
};

const clearDis = function (e) {
  if (e.target.classList.contains("clear")) {
    solDisplay.style.fontSize = "3rem";
    solDisplay.textContent = "";
    prevDisplay.textContent = "";
    state.opA = "";
    state.opB = "";
    state.operator = "";
    allowDecim = !allowDecim;
  }
};

const deleteNum = function (e) {
  if (e.target.classList.contains("del")) {
    const deletedNum = [...solDisplay.textContent].pop();
    if (deletedNum === ".") allowDecim = !allowDecim;

    solDisplay.textContent = solDisplay.textContent.replace(deletedNum, "");
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
    const target = e.target;
    if (allowDecim) {
      solDisplay.textContent += ".";
      allowDecim = !allowDecim;
    }
  }
};

const equals = function(e,a,b,o){
  if (e.target.classList.contains("eq")) {
    prevDisplay.textContent = solDisplay.textContent.replace('=','');
    prevDisplay.style.opacity = '0.5';
    prevDisplay.style.fontSize = '2rem';
    solDisplay.textContent = '';
  }
}

const add = function (a, b) {
  console.log("addition", a + b);
  return a + b;
};

const subs = function (a, b) {
  console.log("substraction", a - b);
  return a - b;
};

const multi = function (a, b) {
  console.log("multiplication", a * b);
  return a * b;
};

const devide = function (a, b) {
  console.log("divition", a / b);
  return a / b;
};

const operate = function (a, b, o) {
  state.opA = a;
  state.opB = b;
  state.operator = o;

  o === "+"
    ? add(a, b)
    : o === "-"
    ? subs(a, b)
    : o === "x"
    ? multi(a, b)
    : o === "÷"
    ? devide(a, b)
    : "";
};

btnsEl.addEventListener("click", (e) => {
  clearDis(e);
  deleteNum(e);
  displayNum(e);
  addNegative(e);
  addDecimal(e);
  equals(e);
});
