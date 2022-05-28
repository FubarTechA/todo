"use strict";

const mode = document.querySelector(".mode");
const wrapper = document.querySelector(".wrapper");
const header = document.querySelector("header");
const main = document.querySelector("main");
const input = document.querySelector(".create");
const todoContainer = document.querySelector(".todoListContainer");
const todoUl = document.querySelector(".todoContainer");
const circle = document.querySelectorAll(".circle");
let todoList = document.querySelectorAll(".todoList");
const todoInfo = document.querySelectorAll(".todoInfo");
const functionDiv = document.querySelector(".functions");
const stateDiv = functionDiv.querySelector(".state");
const functionPara = functionDiv.querySelectorAll("p");

class App {
  constructor() {
    this.md = ["sun", "moon"];
    this.modeArray = [main, header, input, todoContainer, functionDiv];
    mode.addEventListener("click", this.changeMode.bind(this));
    todoContainer.addEventListener("click", this.completeTask.bind(this));
    stateDiv.addEventListener("click", this.showActive.bind(this));
    this.createTodo();
    this.collectInput();
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

  showActive(e) {
    // adding the active class to clicked and removing active class from siblings
    this.addActive(e);
  }

  addActive(event) {
    let para = event.target;
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
  }

  createTodo() {
    input.addEventListener("click", function () {
      input.removeAttribute("placeholder");
    });
  }

  collectInput() {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        // let enterKey = e.key;
        // console.log(enterKey);
        const text = input.value;
        const markup = `
        <li class="todoList">
        <div class="todoItem">
          <span class="circle">
            <img src="/images/icon-check.svg" alt="" />
          </span>
          <p class="todoInfo">${text}</p>
        </div>
        <img src="/images/icon-cross.svg" alt="" class="cross" />
      </li>
        `;
        todoUl.insertAdjacentHTML("afterbegin", markup);
        todoList = document.querySelectorAll(".todoList");
        // console.log(todoList);
        if (todoList.length > 6) {
          console.log(todoUl.style);
          todoUl.classList.add("overflow");
        }
      } else return;
      e.preventDefault();
      input.value = "";
      input.setAttribute("placeholder", "Create a new todo...");
    });
  }
}

const Todo = new App();
