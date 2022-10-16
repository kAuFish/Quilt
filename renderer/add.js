"use strict";

const { ipcRenderer } = require("electron"); //force electron to be loaded

document.getElementById("todoForm").addEventListener("submit", (evt) => {
  // load a basic form to add a todo entry
  evt.preventDefault(); // prevent default refresh every time

  const input = evt.target[0]; //get the input on the form

  ipcRenderer.send("add-todo", input.value); // this sends the todo to the main process

  input.value = ""; // this clears the input so it's not getapplesgetapplesgotostoregetapplesgotostorepaycreditcard
});
