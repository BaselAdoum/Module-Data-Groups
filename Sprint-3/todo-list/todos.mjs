/*
  This file contains the BUSINESS LOGIC for our ToDo app.
  It handles all the data operations - no HTML or DOM here!
  
  A ToDo List is stored as an array of objects like this:
  [
    { task: "Wash dishes", completed: false },
    { task: "Buy groceries", completed: true }
  ]
*/

// Add a new task to the todo list
export function addTask(todos, task, completed = false) {
  // Create a new task object and add it to the end of the array
  todos.push({ task, completed });
}

// Delete a specific task by its index (position in the array)
export function deleteTask(todos, taskIndex) {
  // Check if the task exists at this index
  if (todos[taskIndex]) {
    // Remove 1 item at the taskIndex position
    todos.splice(taskIndex, 1);
  }
}

// Toggle (switch) the completed status of a task
export function toggleCompletedOnTask(todos, taskIndex) {
  // Check if the task exists at this index
  if (todos[taskIndex]) {
    // Switch from true to false or false to true
    todos[taskIndex].completed = !todos[taskIndex].completed;
  }
}

// NEW FUNCTION: Delete all completed tasks at once
export function deleteCompleted(todos) {
  // Step 1: Keep only the tasks that are NOT completed
  const incompleteTodos = todos.filter((todo) => !todo.completed);

  // Step 2: Clear the original array
  todos.length = 0;

  // Step 3: Add back only the incomplete tasks
  // The ... spreads the array into individual items
  todos.push(...incompleteTodos);
}
