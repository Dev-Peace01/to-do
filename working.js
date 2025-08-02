const taskInput = document.getElementById("tasks");
const addBtn = document.getElementById("add-btn");
const taskBox = document.querySelector(".task-box");
const clearBtn = document.querySelector(".clear-btn");
const filters = document.querySelectorAll(".task-control span");

let tasks = [];

function renderTasks(filter = "all") {
  taskBox.innerHTML = "";
  tasks.forEach((task, index) => {
    if (filter === "pending" && task.completed) return;
    if (filter === "completed" && !task.completed) return;

    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");
    li.innerHTML = `<label for="task-${index}">
            <input type="checkbox" id="task-${index}" ${
      task.completed ? "checked" : ""
    }>
            <p>${task.name}</p>
          </label>
          <div class="settings">
            <img src="img/ellipsis-solid.svg" alt="ellipsis" width="10px">
            <ul class="settings-menu">
              <li onclick="editTask(${index})"><img src="img/pen-solid.svg" width="12px"> Edit</li>
              <li onclick="deleteTask(${index})"><img src="img/trash-solid.svg" width="10px"> Delete</li>
            </ul>
          </div>`;
    taskBox.appendChild(li);

    li.querySelector("input").addEventListener("change", () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks(currentFilter);
    });
  });
}

function addTask() {
  const value = taskInput.value.trim();
  if (value === "") return;
  tasks.push({ name: value, completed: false });
  taskInput.value = "";
  renderTasks(currentFilter);
}

function editTask(index) {
  const newName = prompt("Edit task:", tasks[index].name);
  if (newName !== null && newName.trim() !== "") {
    tasks[index].name = newName.trim();
    renderTasks(currentFilter);
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(currentFilter);
}

function clearAll() {
  tasks = [];
  renderTasks(currentFilter);
}

let currentFilter = "all";
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.id;
    renderTasks(currentFilter);
  });
});

taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

addBtn.addEventListener("click", addTask);

clearBtn.addEventListener("click", clearAll);

// Initial render
renderTasks();
