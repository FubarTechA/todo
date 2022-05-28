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
const allpara = document.querySelector(".allItems");
const pendingpara = document.querySelector(".pending");
const completedpara = document.querySelector(".completed");
class App {
  constructor() {
    this.md = ["sun", "moon"];
    this.modeArray = [main, header, input, todoContainer, functionDiv];
    this.completdeArr = [];

    mode.addEventListener("click", this.changeMode.bind(this));
    todoUl.addEventListener("click", this.completeTask.bind(this));
    stateDiv.addEventListener("click", this.showActive.bind(this));
    input.addEventListener("click", this.removePlaceholder);
    document.addEventListener("keydown", this.createTodo.bind(this));
    stateDiv.addEventListener("mouseover", this.showHover.bind(this));
    stateDiv.addEventListener("mouseout", this.removeHover.bind(this));
    clearPara.addEventListener("mouseover", this.showClearHover);
    clearPara.addEventListener("mouseout", this.hideClearHover);
    todoUl.addEventListener("mouseover", this.addTodoHover.bind(this));
    todoUl.addEventListener("mouseout", this.removeTodoHover.bind(this));
    todoUl.addEventListener("click", this.deleteTodo.bind(this));
    this.showCompleted();
    this.showPending();
    this.showAll();
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

    this.addAttribute(event);
  }

  markComplete(ev) {
    let circle = ev.target.closest(".circle");
    if (!circle) return;
    let list = circle.closest(".todoList");
    const task = list.querySelector(".todoInfo");
    const check = circle.querySelector("img");
    task.classList.add("completed");
    circle.classList.add("completed");
    check.classList.add("show");
  }

  addAttribute(ev) {
    let list = ev.target.closest(".todoList");
    if (!list) return;
    list.setAttribute("data-status", "completed");
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
    <li class="todoList" data-status="pending">
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
      todoUl.classList.add("overflow");
    }
  }

  showClearHover() {
    clearPara.classList.add("hover");
  }

  hideClearHover() {
    clearPara.classList.remove("hover");
  }

  addTodoHover(e) {
    const item = e.target.closest(".todoList");
    const circle = e.target.closest(".circle");
    if (item) {
      let cross = item.querySelector(".cross");
      cross.classList.add("show");
    }
    if (circle) {
      circle.classList.add("hover");
    }
  }

  removeTodoHover(e) {
    const item = e.target.closest(".todoList");
    const circle = e.target.closest(".circle");
    if (item) {
      let cross = item.querySelector(".cross");
      cross.classList.remove("show");
    }
    if (circle) {
      circle.classList.remove("hover");
    }
  }

  deleteTodo(e) {
    const close = e.target.closest(".cross");
    if (!close) return;
    const item = close.closest(".todoList");
    item.remove();
  }

  showCompleted() {
    completedpara.addEventListener("click", function () {
      const list = document.querySelectorAll(".todoList");
      list.forEach((item) => {
        item.style.display = "flex";
        if (item.dataset.status === "completed") return;
        item.style.display = "none";
      });
    });
  }
  showPending() {
    pendingpara.addEventListener("click", function () {
      const list = document.querySelectorAll(".todoList");
      list.forEach((item) => {
        item.style.display = "flex";
        if (item.dataset.status === "pending") return;
        item.style.display = "none";
      });
    });
  }

  showAll() {
    allpara.addEventListener("click", function () {
      const list = document.querySelectorAll(".todoList");
      list.forEach((item) => (item.style.display = "flex"));
    });
  }
}

const Todo = new App();
// remember to set all the to do list to display flex when you want to add a new list item
