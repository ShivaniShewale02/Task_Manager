// Retrieve existing todos from localStorage or initialize an empty array if none exist
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all"; // Current filter for displaying tasks: "all", "complete", or "pending"

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Render the list of todos based on the current filter
function renderTodos() {
    const resultShow = document.querySelector(".resultShow"); // Get the container where todos will be displayed
    resultShow.innerHTML = ""; // Clear previous todo list

    // Filter todos based on the selected filter
    const filteredTodos = todos.filter((todo) => {
        if (currentFilter === "complete") return todo.completed; // Show only completed tasks
        if (currentFilter === "pending") return !todo.completed; // Show only pending tasks
        return true; // Show all tasks by default
    });

    // Iterate over the filtered todos and create list items
    filteredTodos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = todo.completed ? "completed" : ""; // Add a class for completed tasks
        
        // Construct the inner HTML of the todo item with action buttons
        li.innerHTML = `
        <div class="todo-content">
            <span class="todo-text">${todo.text}</span>
        </div>
        <div class="todo-action">
            <!-- Button to toggle completion status -->
            <button data-index="${index}" class="action-btn complete-btn">
                <i class="fas ${todo.completed ? "fa-rotate-left" : "fa-check"}"></i>
            </button>
            <!-- Button to delete the task -->
            <button data-index="${index}" class="action-btn delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
        resultShow.appendChild(li); // Append the created list item to the result container
    });
}

// Function to add a new todo
function addTodos() {
    const input = document.querySelector(".inputDetail-i"); // Get the input field for the task
    const text = input.value.trim(); // Remove leading/trailing spaces from the input
    if (text) {
        todos.push({
            text: text, // The text of the new todo
            completed: false, // New tasks are not completed by default
        });
        input.value = ""; // Clear the input field after adding the task
        saveTodos(); // Save the updated list of todos
        renderTodos(); // Re-render the todo list
    } else {
        alert("Please enter a task!"); // Alert the user if the input is empty
    }
}

// Toggle the completion status of a todo based on its index
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed; // Invert the completion status
    saveTodos(); // Save changes to localStorage
    renderTodos(); // Re-render the todo list
}

// Delete a todo based on its index
function deleteTodo(index) {
    todos.splice(index, 1); // Remove the todo from the array
    saveTodos(); // Save changes to localStorage
    renderTodos(); // Re-render the todo list
}

// Add event listener for the "Add Task" button
document.querySelector(".inputDetail-b").addEventListener("click", addTodos);

// Add event listener to allow adding tasks by pressing the "Enter" key
document.querySelector(".inputDetail-i").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTodos();
    }
});

// Handle click events on the todo list for toggling completion or deleting
document.querySelector(".resultShow").addEventListener("click", function (e) {
    const target = e.target.closest("button"); // Get the clicked button element
    if (!target) return; // Ignore clicks outside buttons

    const todoIndex = parseInt(target.dataset.index); // Get the index of the clicked todo
    if (target.classList.contains("complete-btn")) {
        toggleTodo(todoIndex); // Toggle completion if the button is a "complete" button
    } else if (target.classList.contains("delete-btn")) {
        deleteTodo(todoIndex); // Delete the todo if the button is a "delete" button
    }
});

// Add filter functionality to display specific types of tasks
document.querySelector(".filter-container").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        currentFilter = e.target.dataset.filter; // Update the current filter based on button click
        renderTodos(); // Re-render the todo list based on the new filter
    }
});

// Initial render to display todos on page load
renderTodos();
