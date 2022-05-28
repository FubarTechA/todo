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
const clearPara = functionDiv.querySelector(".clear");
const cross = document.querySelector(".cross");
class App {
  constructor() {
    this.md = ["sun", "moon"];
    this.modeArray = [main, header, input, todoContainer, functionDiv];
    mode.addEventListener("click", this.changeMode.bind(this));
    todoContainer.addEventListener("click", this.completeTask.bind(this));
    stateDiv.addEventListener("click", this.showActive.bind(this));
    input.addEventListener("click", this.removePlaceholder);
    document.addEventListener("keydown", this.createTodo.bind(this));
    stateDiv.addEventListener("mouseover", this.showHover.bind(this));
    stateDiv.addEventListener("mouseout", this.removeHover.bind(this));
    clearPara.addEventListener("mouseover", this.showClearHover);
    clearPara.addEventListener("mouseout", this.hideClearHover);
    this.addTodoHover();
    this.removeTodoHover();
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
    let circle = ev.target.closest(".circle");
    if (!circle) return;
    const task = circle.closest(".todoList").querySelector(".todoInfo");
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
    if (!para) return;
    let siblings = para.closest(".state").querySelectorAll("p");
    siblings.forEach((sib) => {
      if (sib === para) return;
      sib.classList.remove("active");
    });
    para.classList.add("active");
    if (para.textContent === "All") {
      console.log(todoInfo);
    }
  }

  showHover(e) {
    // selecting the p tag
    let para = e.target;
    if (!para) return;
    // adding the hover class when mouse is over the para
    para.classList.add("hover");
  }

  removeHover(e) {
    // selecting the p tag
    let para = e.target;
    if (!para) return;

    // removing the hover class when mouse is over the para
    para.classList.remove("hover");
  }

  removePlaceholder() {
    input.removeAttribute("placeholder");
  }

  createTodo(e) {
    if (e.key === "Enter") {
      const text = input.value;

      // creating and inserting the markup for the new to do entry
      this.todoMarkup(text);

      // adding the scroll feature on overflow
      this.addScroller();
    } else return;
    e.preventDefault();
    // setting the placeholder back to its default
    input.value = "";
    input.setAttribute("placeholder", "Create a new todo...");
  }

  todoMarkup(val) {
    const markup = `
    <li class="todoList">
    <div class="todoItem">
      <span class="circle">
        <img src="/images/icon-check.svg" alt="" />
      </span>
      <p class="todoInfo">${val}</p>
    </div>
    <img src="/images/icon-cross.svg" alt="" class="cross" />
  </li>
    `;
    todoUl.insertAdjacentHTML("afterbegin", markup);
    todoList = document.querySelectorAll(".todoList");
  }

  addScroller() {
    if (todoList.length > 6) {
      console.log(todoUl.style);
      todoUl.classList.add("overflow");
    }
  }

  showClearHover() {
    clearPara.classList.add("hover");
  }

  hideClearHover() {
    clearPara.classList.remove("hover");
  }

  addTodoHover() {
    todoUl.addEventListener("mouseover", function (e) {
      const para = e.target.closest("p");
      const circle = e.target.closest(".circle");
      if (para) {
        let cross = para.closest(".todoList").querySelector(".cross");
        cross.classList.add("show");
      }
      if (circle) {
        circle.classList.add("hover");
      }
    });
  }

  removeTodoHover() {
    todoUl.addEventListener("mouseout", function (e) {
      const para = e.target.closest("p");
      const circle = e.target.closest(".circle");
      if (para) {
        let cross = para.closest(".todoList").querySelector(".cross");
        cross.classList.remove("show");
      }
      if (circle) {
        circle.classList.remove("hover");
      }
    });
  }
}

const Todo = new App();
