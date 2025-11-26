// The tests is prepared to demonstrate we can test the functions
// in a module independently.

// Command to execute this script:
//   npm test todos.test.mjs
/*
  This file tests our BUSINESS LOGIC functions.
  We can test these without a browser because they don't use HTML/DOM.
*/

// Import all the functions from todos.mjs
import * as Todos from "./todos.mjs";

// Helper function to create sample todo data for testing
function createMockTodos() {
  return [
    { task: "Task 1 description", completed: true },
    { task: "Task 2 description", completed: false },
    { task: "Task 3 description", completed: true },
    { task: "Task 4 description", completed: false },        
  ];
}

// Sample task for testing
const theTask = { task: "The Task", completed: false };

// Test group for the addTask function
describe("addTask()", () => {
  test("Add a task to an empty ToDo list", () => {
    let todos = [];
    Todos.addTask(todos, theTask.task, theTask.completed);
    expect(todos).toHaveLength(1);
    expect(todos[0]).toEqual(theTask);
  });

  test("Should append a new task to the end of a ToDo list", () => {
    const todos = createMockTodos();
    const lengthBeforeAddition = todos.length;
    Todos.addTask(todos, theTask.task, theTask.completed);
    
    // todos should now have one more task
    expect(todos).toHaveLength(lengthBeforeAddition + 1);

    // New task should be at the end of the array
    expect(todos[todos.length - 1]).toEqual(theTask);
  });
});

// Test group for the deleteTask function
describe("deleteTask()", () => {
  test("Delete the first task", () => {
    const todos = createMockTodos();
    const todosBeforeDeletion = [...todos]; // Copy the array
    const lengthBeforeDeletion = todos.length;
    
    Todos.deleteTask(todos, 0); // Delete first task

    expect(todos).toHaveLength(lengthBeforeDeletion - 1);
    expect(todos[0]).toEqual(todosBeforeDeletion[1]);
    expect(todos[1]).toEqual(todosBeforeDeletion[2]);
    expect(todos[2]).toEqual(todosBeforeDeletion[3]);        
  });

  test("Delete the second task (a middle task)", () => {
    const todos = createMockTodos();
    const todosBeforeDeletion = [...todos];
    const lengthBeforeDeletion = todos.length;
    
    Todos.deleteTask(todos, 1); // Delete second task

    expect(todos).toHaveLength(lengthBeforeDeletion - 1);
    expect(todos[0]).toEqual(todosBeforeDeletion[0]);
    expect(todos[1]).toEqual(todosBeforeDeletion[2]);
    expect(todos[2]).toEqual(todosBeforeDeletion[3]);        
  });

  test("Delete the last task", () => {
    const todos = createMockTodos();
    const todosBeforeDeletion = [...todos];
    const lengthBeforeDeletion = todos.length;
    
    Todos.deleteTask(todos, todos.length - 1); // Delete last task

    expect(todos).toHaveLength(lengthBeforeDeletion - 1);
    expect(todos[0]).toEqual(todosBeforeDeletion[0]);
    expect(todos[1]).toEqual(todosBeforeDeletion[1]);
    expect(todos[2]).toEqual(todosBeforeDeletion[2]);        
  });

  test("Delete a non-existing task", () => {
    const todos = createMockTodos();
    const todosBeforeDeletion = [...todos];
    
    // Try to delete tasks that don't exist
    Todos.deleteTask(todos, 10); // Index too high
    expect(todos).toEqual(todosBeforeDeletion);

    Todos.deleteTask(todos, -1); // Negative index
    expect(todos).toEqual(todosBeforeDeletion);
  });
});

// Test group for the toggleCompletedOnTask function
describe("toggleCompletedOnTask()", () => {
  test("Expect the 'completed' property to toggle on an existing task", () => {
    const todos = createMockTodos();
    const taskIndex = 1;
    const completedStateBeforeToggle = todos[taskIndex].completed;
    
    // Toggle once
    Todos.toggleCompletedOnTask(todos, taskIndex);
    expect(todos[taskIndex].completed).toEqual(!completedStateBeforeToggle);

    // Toggle again (should go back to original)
    Todos.toggleCompletedOnTask(todos, taskIndex);
    expect(todos[taskIndex].completed).toEqual(completedStateBeforeToggle);
  });

  test("Expect toggling on a task does not affect other tasks", () => {
    const todos = createMockTodos();
    const todosBeforeToggle = [...todos];
    
    // Toggle only the second task
    Todos.toggleCompletedOnTask(todos, 1);
    
    // Other tasks should remain unchanged
    expect(todos[0]).toEqual(todosBeforeToggle[0]);    
    expect(todos[2]).toEqual(todosBeforeToggle[2]);
    expect(todos[3]).toEqual(todosBeforeToggle[3]);
  });

  test("Expect no change when toggling on a non-existing task", () => {
    const todos = createMockTodos();
    const todosBeforeToggle = [...todos];

    // Try to toggle tasks that don't exist
    Todos.toggleCompletedOnTask(todos, 10); // Index too high
    expect(todos).toEqual(todosBeforeToggle);

    Todos.toggleCompletedOnTask(todos, -1); // Negative index
    expect(todos).toEqual(todosBeforeToggle);
  });
});

// NEW TEST GROUP: Test the deleteCompleted function
describe("deleteCompleted()", () => {
  test("removes all completed tasks from the list", () => {
    const todos = createMockTodos();
    
    // Before: we have 4 tasks (2 completed, 2 not completed)
    Todos.deleteCompleted(todos);
    
    // After: should have only the 2 non-completed tasks
    expect(todos).toHaveLength(2);
    expect(todos).toEqual([
      { task: "Task 2 description", completed: false },
      { task: "Task 4 description", completed: false }
    ]);
  });

  test("does nothing when there are no completed tasks", () => {
    const todos = [
      { task: "Task 1", completed: false },
      { task: "Task 2", completed: false }
    ];
    
    const todosBefore = [...todos]; // Make a copy for comparison
    Todos.deleteCompleted(todos);
    
    // Array should be unchanged
    expect(todos).toEqual(todosBefore);
  });

  test("removes all tasks when all are completed", () => {
    const todos = [
      { task: "Task 1", completed: true },
      { task: "Task 2", completed: true }
    ];
    
    Todos.deleteCompleted(todos);
    
    // Array should be empty
    expect(todos).toEqual([]);
  });

  test("handles empty array", () => {
    const todos = [];
    
    Todos.deleteCompleted(todos);
    
    // Empty array should stay empty
    expect(todos).toEqual([]);
  });
});