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

export function setTitles() {
  const taskNames = document.querySelectorAll(".task .task-name");
  for (let taskName of taskNames) taskName.title = taskName.textContent;

  const taskDescs = document.querySelectorAll(".task .task-desc");
  for (let taskDesc of taskDescs) taskDesc.title = taskDesc.textContent;
}
