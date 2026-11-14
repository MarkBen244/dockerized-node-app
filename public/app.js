
const API_URL = "/tasks";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const message = document.getElementById("message");

const totalTasks = document.getElementById("total-tasks");
const pendingTasks = document.getElementById("pending-tasks");
const completedTasks = document.getElementById("completed-tasks");

// Display a message
function showMessage(text) {
    message.textContent = text;
}

// Retrieve tasks from the backend
async function loadTasks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load tasks");
        }

        const tasks = await response.json();

        displayTasks(tasks);
        updateStats(tasks);

    } catch (error) {
        console.error(error);
        showMessage("Unable to load tasks. Please try again.");
    }
}

// Display tasks on the page
function displayTasks(tasks) {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        showMessage("No tasks yet. Add your first task!");
        return;
    }

    showMessage("");

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const title = document.createElement("span");
        title.textContent = task.title;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", () => {
            toggleTask(task.id, !task.completed);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        li.appendChild(title);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

// Update task statistics
function updateStats(tasks) {
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;

    totalTasks.textContent = tasks.length;
    pendingTasks.textContent = pending;
    completedTasks.textContent = completed;
}

// Add a new task
taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (!title) {
        showMessage("Please enter a task.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title })
        });

        if (!response.ok) {
            throw new Error("Could not create task");
        }

        taskInput.value = "";
        await loadTasks();

    } catch (error) {
        console.error(error);
        showMessage("Unable to add task.");
    }
});

// Mark a task as completed or pending
async function toggleTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ completed })
        });

        if (!response.ok) {
            throw new Error("Could not update task");
        }

        await loadTasks();

    } catch (error) {
        console.error(error);
        showMessage("Unable to update task.");
    }
}

// Delete a task
async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Could not delete task");
        }

        await loadTasks();

    } catch (error) {
        console.error(error);
        showMessage("Unable to delete task.");
    }
}

// Load tasks when the page opens
loadTasks();
