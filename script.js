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
console.log(functionDiv);

class App {
  constructor() {
    this.md = ["sun", "moon"];
    this.changeMode();
  }

  changeMode() {
    mode.addEventListener("click", function () {
      header.classList.toggle("light");
      main.classList.toggle("light");
      input.classList.toggle("light");
      todoContainer.classList.toggle("light");
      functionDiv.classList.toggle("light");
      circle.forEach((circle) => circle.classList.toggle("light"));
      todoList.forEach((list) => list.classList.toggle("light"));
      todoInfo.forEach((list) => list.classList.toggle("light"));
    });
  }
}

const Todo = new App();
