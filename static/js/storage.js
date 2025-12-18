export function scheduleToJson() {
  let schedule = [[], [], [], [], [], [], []];
  let days = document.querySelectorAll(".schedule .day");
  days.forEach((day, i) => {
    let tasks = day.querySelectorAll(".task");
    tasks.forEach((task) => {
      let taskObj = {
        taskName: task.querySelector(".task-name").textContent,
        priority: task.dataset.priority,
        start: task.querySelector(".task-start").textContent,
        end: task.querySelector(".task-end").textContent,
        desc: task.querySelector(".task-desc").textContent,
      };
      schedule[i].push(taskObj);
    });
  });
  return schedule;
}

export function loadUserInfo() {
  let scheduleString = window.localStorage.getItem("schedule");

  if (scheduleString) return JSON.parse(scheduleString);
}

export function saveUserInfo(info) {
  window.localStorage.setItem("schedule", JSON.stringify(info.schedule));
}
