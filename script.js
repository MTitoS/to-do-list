const inputTask = document.querySelector(".new-task-input");
const btnTask = document.querySelector(".add-task-btn");
const tasks = document.querySelector(".tasks");

function createTask(textInput) {
  createElements(textInput);
  saveTask();
}

function createElements(textInput) {
  let li = document.createElement("li");
  tasks.appendChild(li);

  let p = document.createElement("p");
  p.innerHTML = textInput;
  li.appendChild(p);

  let button = document.createElement("button");
  button.innerHTML = "Delete";
  button.setAttribute("class", "delete");
  li.appendChild(button);
}

function deleteTask() {
  tasks.removeChild();
}

inputTask.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTask.value) return;

    createTask(inputTask.value);
    inputTask.value = "";
    inputTask.focus();
  }
});

btnTask.addEventListener("click", function () {
  if (!inputTask.value) return;

  createTask(inputTask.value);
  inputTask.value = "";
  inputTask.focus();
});

document.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("delete")) {
    el.parentElement.remove();
    saveTask();
  }
});

function saveTask() {
  const liTasks = tasks.querySelectorAll("li");
  const taskList = [];

  for (let tasks of liTasks) {
    let taskText = tasks.innerText;
    taskText = taskText.replace("Delete", "").trim();
    taskList.push(taskText);
  }

  const tasksJSON = JSON.stringify(taskList);
  localStorage.setItem("tasks", tasksJSON);
}

function addSavedTasks() {
  const tasks = localStorage.getItem("tasks");
  const taskList = JSON.parse(tasks);

  for (let task of taskList) {
    createTask(task);
  }
}

addSavedTasks();
