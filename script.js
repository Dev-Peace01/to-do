const taskInput = document.getElementById("tasks");
const taskKey = "tasks";

function addTask(event) {
  event.preventDefault();
  const newTaskValue = taskInput.value;
  if (newTaskValue === "") {
    alert("Make sure you add a task name before adding a task");
    return;
  }
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const newTask = {
    id: Date.now() + Math.random(),
    value: newTaskValue,
    completed: false,
    status: "pending", // pending, completed
  };

  const isTaskNameExist = tasks.find((task) => task.value === newTaskValue);

  // console.log(isTaskNameExist);
  if (isTaskNameExist) {
    alert("This task already exists");
    return;
  }

  //   tasks.push(newTask);

  const updatedList = [newTask, ...tasks];

  localStorage.setItem(taskKey, JSON.stringify(updatedList));
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  let tasksElements = ``;
  tasks.forEach((task) => {
    tasksElements += `<li class="task">
          <label for="${task.id}">
            <input type="checkbox" onchange="checkboxAction(${task.id})" ${
      task.completed ? "checked" : ""
    } id="${task.id}" />
            <p>${task.value}</p>
          </label>


          <div class="settings">
            <img
              src="img/ellipsis-solid.svg"
              alt="ellipsis-solid"
              width="10px"
            />
            <ul class="settings-menu">
              <li>
              <button onclick="editTask(${task.id})"
                <img
                  src="img/pen-solid.svg"
                  alt="pen"
                  width="12px"
                  id="pen"
                />Edit
                </button>
              </li>
              <li>
              <button onclick="deleteTask(${task.id})"
                <img
                  src="img/trash-solid.svg"
                  alt="Delete"
                  width="10px"               
                /> Delete
              </button>
              </li>
            </ul>
          </div>
        </li>`;
  });
  const tasksListElement = document.getElementById("tasks-list");
  if (tasksListElement) {
    tasksListElement.innerHTML = tasksElements;
  }
}

function clearAllTasks() {
  localStorage.removeItem(taskKey);
  renderTasks();
}

function filterTasks(filter) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const filteredTasks = tasks.filter((task) => task.status === filter);
  let tasksElements = ``;
  if (filteredTasks.length === 0) {
    tasksElements = `<div class="no-tasks">No ${filter} tasks</div>`;
  }
  filteredTasks.forEach((task) => {
    tasksElements += `<li class="task">
          <label for="${task.id}">
            <input type="checkbox" onchange="checkboxAction(${task.id})" ${
      task.completed ? "checked" : ""
    } id="${task.id}" />
            <p>${task.value}</p>
          </label>
          <div class="settings">
            <img
              src="img/ellipsis-solid.svg"
              alt="ellipsis-solid"
              width="10px"
            />
            <ul class="settings-menu">
              <li>
              <button onclick="editTask(${task.id})"
                <img
                  src="img/pen-solid.svg"
                  alt="pen"
                  width="12px"
                  id="pen"
                />Edit
                </button>
              </li>
              <li>
                <button onclick="deleteTask(${task.id})"
                <img
                  src="img/trash-solid.svg"
                  alt="Delete"
                  width="10px"               
                /> Delete
              </button>
              </li>
            </ul>
          </div>
        </li>`;
  });
  const tasksListElement = document.getElementById("tasks-list");
  if (tasksListElement) {
    tasksListElement.innerHTML = tasksElements;
  }
}

function checkboxAction(taskId) {
  // console.log(taskId)
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    // Toggle the completed status
    const taskValue = tasks[taskIndex];
    taskValue.completed = !taskValue.completed;
    taskValue.status = taskValue.completed
      ? "completed"
      : "pending";
    localStorage.setItem(taskKey, JSON.stringify(tasks));
    renderTasks();
  }
}

function deleteTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem(taskKey, JSON.stringify(updatedTasks));

  renderTasks();
}

function editTask(taskId) {
  // console.log(taskId);
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    const taskValue = tasks[taskIndex].value;
    const newTaskValue = prompt("Edit your task", taskValue);
    if (newTaskValue && newTaskValue.trim() !== "") {
      tasks[taskIndex].value = newTaskValue;
      localStorage.setItem(taskKey, JSON.stringify(tasks));
      renderTasks();
    } else {
      alert("Task name cannot be empty");
    }     
}
}
renderTasks();
