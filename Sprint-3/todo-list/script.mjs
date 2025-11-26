/*
  This file contains the UI LOGIC for our ToDo app.
  It handles everything related to the webpage - buttons, display, user interaction.
*/

// Import all functions from the todos.mjs file
// The * as Todos means "import everything and call it Todos"
import * as Todos from "./todos.mjs";

// This array will store all our todo tasks
const todos = [];

// Get reference to the todo list element once (for better performance)
const todoListEl = document.getElementById("todo-list");

// Get the template for todo items once
const todoListItemTemplate =
  document.getElementById("todo-item-template").content.firstElementChild;

// Set up everything when the page loads
window.addEventListener("load", () => {
  // Connect the "Add" button to the addNewTodo function
  document.getElementById("add-task-btn").addEventListener("click", addNewTodo);

  // NEW: Connect the "Delete Completed Tasks" button
  document
    .getElementById("delete-completed-btn")
    .addEventListener("click", deleteCompletedTodos);

  // Add some sample tasks to start with
  Todos.addTask(todos, "Wash the dishes", false);
  Todos.addTask(todos, "Do the shopping", true);

  // Display the tasks on the page
  render();
});

// Function to handle adding a new todo
function addNewTodo() {
  // Get the input field where user types the task
  const taskInput = document.getElementById("new-task-input");
  // Get the text and remove extra spaces
  const task = taskInput.value.trim();

  // Only add if the task is not empty
  if (task) {
    // Use our business logic function to add the task
    Todos.addTask(todos, task, false);
    // Update the display
    render();
  }

  // Clear the input field for the next task
  taskInput.value = "";
}

// NEW FUNCTION: Handle deleting all completed tasks
function deleteCompletedTodos() {
  // Use our business logic function to delete completed tasks
  Todos.deleteCompleted(todos);
  // Update the display
  render();
}

// Display all todos on the page
function render() {
  // Clear the current list
  todoListEl.innerHTML = "";

  // For each todo item, create a list element and add it to the page
  todos.forEach((todo, index) => {
    const todoListItem = createListItem(todo, index);
    todoListEl.append(todoListItem);
  });
}

// Create one list item for a todo task
function createListItem(todo, index) {
  // Make a copy of the template
  const li = todoListItemTemplate.cloneNode(true);

  // Set the task description text
  li.querySelector(".description").textContent = todo.task;

  // If the task is completed, add the "completed" CSS class
  if (todo.completed) {
    li.classList.add("completed");
  }

  // Add click event to the complete button
  li.querySelector(".complete-btn").addEventListener("click", () => {
    // Toggle the completed status using our business logic
    Todos.toggleCompletedOnTask(todos, index);
    // Update the display
    render();
  });

  // Add click event to the delete button
  li.querySelector(".delete-btn").addEventListener("click", () => {
    // Delete this specific task using our business logic
    Todos.deleteTask(todos, index);
    // Update the display
    render();
  });

  return li;
}
