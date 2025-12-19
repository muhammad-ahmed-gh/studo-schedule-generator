import { Task } from "Task.js";

export function createEle(data) {
  let element = document.createElement(data.tagName);

  if (data.className) element.className = data.className;
  if (data.id) element.id = data.id;
  if (data.textContent) element.textContent = data.textContent;
  if (data.title) element.title = data.title;

  return element;
}

export function setupTodaySettings() {
  const today = new Date();
  const dayIndex = today.getDay(); // number: 0 -> Sun, 6 -> Sat
  const todayName = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"][
    dayIndex
  ];

  let numTasks = 0;
  let days = document.querySelectorAll(".schedule .day");
  days.forEach((day) => {
    if (day.querySelector(".head").textContent === todayName) {
      day.classList.add("today");
      numTasks = day.querySelector(".tasks").children.length;
    } else day.classList.remove("today");
  });

  let numTasksElement = document.querySelector(".num-tasks");
  numTasksElement.textContent = `${numTasks} ${
    numTasks === 1 ? "task" : "tasks"
  }`;
}

export function setupMenuBtn() {
  const menuBtn = document.querySelector("header .bars");

  if (menuBtn) {
    menuBtn.onclick = () => menuBtn.parentElement.classList.toggle("open");
  }
}

let sortDayTasks = function (tasks) {
  return tasks.slice().sort((a, b) => {
    const [aH, aM] = a.taskStart.split(":").map(Number);
    const [bH, bM] = b.taskStart.split(":").map(Number);
    return aH - bH || aM - bM; // sort by hours, then minutes
  });
};

export function sortSchedule(schedule) {
  return schedule.map((day) => sortDayTasks(day));
}

export function updateSchedule(schedule) {
  // remove all tasks
  let tasks = document.querySelectorAll(".tasks");
  tasks.forEach((tasksSection) => {
    tasksSection.innerHTML = "";
  });

  // insert tasks
  let days = document.querySelectorAll(".schedule .day .tasks");
  schedule.forEach((dayTasks, i) => {
    dayTasks.forEach((task) => {
      let taskElement = document.createElement("div");
      taskElement.className = "task";
      taskElement.dataset.priority = task.taskPrior;
      taskElement.dataset.isGenerated = task.isGenerated ? "true" : "false";

      let taskNameSpan = document.createElement("span");
      taskNameSpan.className = "task-name";
      taskNameSpan.textContent = task.taskName;
      taskNameSpan.title = task.taskName;

      let taskTypeSpan = document.createElement("span");
      taskTypeSpan.className = "task-type";
      taskTypeSpan.textContent = task.taskType;

      let taskPriorSpan = document.createElement("span");
      taskPriorSpan.className = "task-prior";
      taskPriorSpan.textContent = `${task.taskPrior} priority`;

      let taskStartSpan = document.createElement("span");
      taskStartSpan.className = "task-start";
      taskStartSpan.textContent = task.taskStart;

      let taskEndSpan = document.createElement("span");
      taskEndSpan.className = "task-end";
      taskEndSpan.textContent = task.taskEnd;

      let taskDescPar = document.createElement("p");
      taskDescPar.className = "task-desc";
      taskDescPar.textContent = task.taskDesc;
      taskDescPar.title = task.taskDesc;

      taskElement.append(
        taskNameSpan,
        taskTypeSpan,
        taskPriorSpan,
        taskStartSpan,
        taskEndSpan,
        taskDescPar
      );

      taskElement.onclick = function () {
        Task.showProperties(taskElement);
      };

      days[i].appendChild(taskElement);
    });
  });
}
