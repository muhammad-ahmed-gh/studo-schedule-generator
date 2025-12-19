export class Valid {
  static isAfter(time1, time2) {
    // [HH, MM]
    if (time1[0] > time2[0]) return true; // hours
    if (time1[0] === time2[0] && time1[1] > time2[1]) return true; // minutes
    return false;
  }

  static validateNewTask(name, start, end) {
    if (!name.trim() || !start.trim() || !end.trim()) return false;

    // check start is before end
    let startArr = start.split(":").map(Number); // [HH, MM]
    let endArr = end.split(":").map(Number); // [HH, MM]

    if (this.isAfter(startArr, endArr)) return false;

    let tasksNames = document.querySelectorAll(".task .task-name");
    for (let taskName of tasksNames) {
      if (name === taskName.textContent) return false;
    }

    return true;
  }

  static validateEditedTask(editedTask, name, start, end) {
    if (name.trim() === "" || start.trim() === "" || end.trim() === "")
      return false;

    // check start is before end
    let startArr = start.split(":").map(Number);
    let endArr = end.split(":").map(Number);

    if (this.isAfter(startArr, endArr)) return false;

    let tasks = document.querySelectorAll(".task");
    for(let task of tasks) {
      let taskName = task.querySelector(".task-name").textContent;
      if (name === taskName && task !== editedTask) return false;
    }
    return true;
  }
}
