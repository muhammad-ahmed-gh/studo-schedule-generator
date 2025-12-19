import { Task } from "./Task.js";

export class Util {
  static createEle(data) {
    let element = document.createElement(data.tagName);

    if (data.className) element.className = data.className;
    if (data.id) element.id = data.id;
    if (data.textContent) element.textContent = data.textContent;
    if (data.title) element.title = data.title;

    return element;
  }

  static setupTodaySettings() {
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

  static setupMenuBtn() {
    const menuBtn = document.querySelector("header .bars");

    if (menuBtn) {
      menuBtn.onclick = () => menuBtn.parentElement.classList.toggle("open");
    }
  }

  static sortDayTasks(tasks) {
    return tasks.slice().sort((a, b) => {
      const [aH, aM] = a.taskStart.split(":").map(Number);
      const [bH, bM] = b.taskStart.split(":").map(Number);
      return aH - bH || aM - bM; // sort by hours, then minutes
    });
  }

  static sortSchedule(schedule) {
    return schedule.map((day) => this.sortDayTasks(day));
  }

  static updateSchedule(schedule) {
    // remove all tasks
    let tasks = document.querySelectorAll(".tasks");
    tasks.forEach((tasksSection) => {
      tasksSection.innerHTML = "";
    });

    // insert tasks
    let days = document.querySelectorAll(".schedule .day .tasks");
    schedule.forEach((dayTasks, i) => {
      dayTasks.forEach((task) => {
        let taskElement = this.createEle({
          tagName: "div",
          className: "task",
        });
        taskElement.dataset.priority = task.taskPrior;
        taskElement.dataset.isGenerated = task.isGenerated ? "true" : "false";

        let taskNameSpan = this.createEle({
          tagName: "span",
          className: "task-name",
          textContent: task.taskName,
          title: task.taskName,
        });

        let taskTypeSpan = this.createEle({
          tagName: "span",
          className: "task-type",
          textContent: task.taskType,
        });

        let taskPriorSpan = this.createEle({
          tagName: "span",
          className: "task-prior",
          textContent: `${task.taskPrior} priority`,
        });

        let taskStartSpan = this.createEle({
          tagName: "span",
          className: "task-start",
          textContent: task.taskStart,
        });

        let taskEndSpan = this.createEle({
          tagName: "span",
          className: "task-end",
          textContent: task.taskEnd,
        });

        let taskDescPar = this.createEle({
          tagName: "p",
          className: "task-desc",
          textContent: task.taskDesc,
          title: task.taskDesc,
        });

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
}
