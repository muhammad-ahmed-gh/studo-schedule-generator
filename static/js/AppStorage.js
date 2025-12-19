export class AppStorage {
  static scheduleToJson() {
    let schedule = [[], [], [], [], [], [], []];
    let days = document.querySelectorAll(".schedule .day");

    days.forEach((day, i) => {
      let tasks = day.querySelectorAll(".task");

      tasks.forEach((task) => {
        let taskObj = {
          taskName: task.querySelector(".task-name").textContent,
          taskType: task.querySelector(".task-type").textContent,
          taskPrior: task.dataset.priority,
          taskStart: task.querySelector(".task-start").textContent,
          taskEnd: task.querySelector(".task-end").textContent,
          taskDesc: task.querySelector(".task-desc").textContent,
          isGenerated: task.dataset.isGenerated === "true",
        };

        schedule[i].push(taskObj);
      });
    });

    return schedule;
  }

  static loadUserInfo() {
    let scheduleString = window.localStorage.getItem("schedule");

    if (scheduleString !== null) return JSON.parse(scheduleString);
    return null;
  }

  static saveUserInfo(info) {
    window.localStorage.setItem("schedule", JSON.stringify(info.schedule));
  }
}
