"use strict";

const mode = document.querySelector(".mode");
const wrapper = document.querySelector(".wrapper");
const header = document.querySelector("header");
const main = document.querySelector("main");
const input = document.querySelector(".create");
const todoContainer = document.querySelector(".todoListContainer");
const circle = document.querySelectorAll(".circle");
const todoList = document.querySelectorAll(".todoList");
const todoInfo = document.querySelectorAll(".todoInfo");
const functionDiv = document.querySelector(".functions");
const stateDiv = functionDiv.querySelector(".state");
const functionPara = functionDiv.querySelectorAll("p");
// console.log(todoInfo);

class App {
  constructor() {
    this.md = ["sun", "moon"];
    this.modeArray = [main, header, input, todoContainer, functionDiv];
    mode.addEventListener("click", this.changeMode.bind(this));
    todoList.forEach((list) =>
      list.addEventListener("click", this.completeTask.bind(this))
    );
    this.showActive();
  }

  changeMode() {
    if (mode.dataset.mode === "moon") {
      this.changeModeImg("sun");
    } else {
      this.changeModeImg("moon");
    }

    // toggling the light class on array of elements to change mode
    this.toggleLightMode();
  }
  toggleLightMode() {
    const forEachArray = [
      this.modeArray,
      circle,
      todoList,
      todoInfo,
      functionPara,
    ];
    forEachArray.forEach((arr) =>
      arr.forEach((arrayEl) => arrayEl.classList.toggle("light"))
    );
  }

  changeModeImg(string) {
    let newSrc = `/images/icon-${mode.dataset.mode}.svg`;
    mode.setAttribute("src", newSrc);
    mode.dataset.mode = string;
  }

  completeTask(event) {
    // marks the clicked option as a completed task
    this.markComplete(event);
  }

  markComplete(ev) {
    let item = ev.target.closest(".todoList");
    const task = item.querySelector(".todoInfo");
    const circle = item.querySelector(".circle");
    const check = circle.querySelector("img");
    task.classList.add("completed");
    circle.classList.add("completed");
    check.classList.add("show");
  }

  showActive() {
    stateDiv.addEventListener("click", function (e) {
      let para = e.target;
      let siblings = para.closest(".state").querySelectorAll("p");
      console.log(siblings);
      siblings.forEach((sib) => {
        if (sib === para) return;
        sib.classList.remove("active");
      });
      para.classList.add("active");
      if (para.textContent === "All") {
        console.log(todoInfo);
      }
    });
  }
}

const Todo = new App();
