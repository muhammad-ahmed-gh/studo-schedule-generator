import { saveUserInfo, scheduleToJson } from "./storage.js";

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

let sortDayTasks = function (tasks) {
  return tasks.slice().sort((a, b) => {
    const [aH, aM] = a.start.split(":").map(Number);
    const [bH, bM] = b.start.split(":").map(Number);
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
      taskElement.dataset.priority = task.priority;

      let taskNameSpan = document.createElement("span");
      taskNameSpan.className = "task-name";
      taskNameSpan.textContent = task.taskName;

      let taskPriorSpan = document.createElement("span");
      taskPriorSpan.className = "task-prior";
      taskPriorSpan.textContent = `${task.priority} priority`;

      let taskStartSpan = document.createElement("span");
      taskStartSpan.className = "task-start";
      taskStartSpan.textContent = task.start;

      let taskEndSpan = document.createElement("span");
      taskEndSpan.className = "task-end";
      taskEndSpan.textContent = task.end;

      let taskDescPar = document.createElement("p");
      taskDescPar.className = "task-desc";
      taskDescPar.textContent = task.desc;

      taskElement.append(
        taskNameSpan,
        taskPriorSpan,
        taskStartSpan,
        taskEndSpan,
        taskDescPar
      );

      taskElement.onclick = function () {
        showTaskProperties(taskElement);
      };

      days[i].appendChild(taskElement);
    });
  });
}

export function addTaskToSchedule(
  taskName,
  taskPrior,
  taskDay,
  taskStart,
  taskEnd,
  taskDesc
) {
  let task = document.createElement("div");
  task.className = "task";
  task.dataset.priority = taskPrior;

  let taskNameSpan = document.createElement("span");
  taskNameSpan.className = "task-name";
  taskNameSpan.textContent = taskName;

  let taskPriorSpan = document.createElement("span");
  taskPriorSpan.className = "task-prior";
  taskPriorSpan.textContent = `${taskPrior} priority`;

  let taskStartSpan = document.createElement("span");
  taskStartSpan.className = "task-start";
  taskStartSpan.textContent = taskStart;

  let taskEndSpan = document.createElement("span");
  taskEndSpan.className = "task-end";
  taskEndSpan.textContent = taskEnd;

  let taskDescPar = document.createElement("p");
  taskDescPar.className = "task-desc";
  taskDescPar.textContent = taskDesc;

  task.append(
    taskNameSpan,
    taskPriorSpan,
    taskStartSpan,
    taskEndSpan,
    taskDescPar
  );

  task.onclick = function () {
    showTaskProperties(task);
  };

  let days = document.querySelectorAll(".schedule .day");
  days.forEach((day) => {
    let dayName = day.querySelector(".head").textContent;
    if (dayName.toLowerCase().trim() === taskDay.toLowerCase().trim()) {
      day.querySelector(".tasks").appendChild(task);
    }
  });
}

export function showTaskProperties(task) {
  let createLabel = function (forAtt, className, text) {
    let label = document.createElement("label");
    label.className = className;
    label.setAttribute("for", forAtt);
    label.textContent = text;
    return label;
  };

  let taskPropBox = document.createElement("div");
  let overlay = document.createElement("div");

  taskPropBox.className = "task-prop-box";
  overlay.className = "overlay";

  // create box content
  // box title
  let boxTitle = document.createElement("span");
  boxTitle.className = "task-prop-box-title";
  boxTitle.textContent = "task properties";

  // close box button
  let closeIcon = document.createElement("i");
  closeIcon.className = "fa-solid fa-xmark";
  let closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.appendChild(closeIcon);
  closeBtn.onclick = () => {
    overlay.remove();
    taskPropBox.remove();
  };

  // add input fields
  let fieldContainer = document.createElement("div");
  fieldContainer.className = "task-prop-field";
  // name
  let nameLabel = createLabel("task-name-field", "task-prop-label", "Name");

  let nameField = document.createElement("input");
  nameField.type = "text";
  nameField.id = "task-name-field";
  nameField.className = "task-prop-input-field";
  nameField.value = task.querySelector(".task-name").textContent;

  let nameFieldContainer = fieldContainer.cloneNode(true);
  nameFieldContainer.append(nameLabel, nameField);

  // priority
  let priorLabel = createLabel(
    "task-prior-field",
    "task-prop-label",
    "Priority"
  );

  let priorList = document.createElement("select");
  priorList.id = "task-prior-field";
  priorList.className = "task-prop-input-field";

  let priorOption1 = document.createElement("option");
  priorOption1.value = "top";
  priorOption1.textContent = "Top";

  let priorOption2 = document.createElement("option");
  priorOption2.value = "high";
  priorOption2.textContent = "High";

  let priorOption3 = document.createElement("option");
  priorOption3.value = "medium";
  priorOption3.textContent = "Medium";

  let priorOption4 = document.createElement("option");
  priorOption4.value = "low";
  priorOption4.textContent = "Low";

  priorList.append(priorOption1, priorOption2, priorOption3, priorOption4);
  priorList.value = task.dataset.priority;
  let priorFieldContainer = fieldContainer.cloneNode(true);
  priorFieldContainer.append(priorLabel, priorList);

  // start time
  let startTimeLabel = createLabel(
    "task-start-field",
    "task-prop-label",
    "Start"
  );
  let startTimeField = document.createElement("input");
  startTimeField.type = "time";
  startTimeField.id = "task-start-field";
  startTimeField.className = "task-prop-input-field";
  startTimeField.value = task.querySelector(".task-start").textContent;

  let startTimeFieldContainer = fieldContainer.cloneNode(true);
  startTimeFieldContainer.append(startTimeLabel, startTimeField);

  // end time
  let endTimeLabel = createLabel("task-end-field", "task-prop-label", "End");
  let endTimeField = document.createElement("input");
  endTimeField.type = "time";
  endTimeField.id = "task-end-field";
  endTimeField.className = "task-prop-input-field";
  endTimeField.value = task.querySelector(".task-end").textContent;

  let endTimeFieldContainer = fieldContainer.cloneNode(true);
  endTimeFieldContainer.append(endTimeLabel, endTimeField);

  // description
  let descLabel = createLabel(
    "task-desc-field",
    "task-prop-label",
    "Description"
  );
  let descField = document.createElement("textarea");
  descField.id = "task-desc-field";
  descField.className = "task-prop-input-field";
  descField.value = task.querySelector(".task-desc").textContent;

  let descFieldContainer = fieldContainer.cloneNode(true);
  descFieldContainer.append(descLabel, descField);

  // options
  let optionsSection = document.createElement("div");
  optionsSection.className = "options";

  let doneBtn = document.createElement("button");
  doneBtn.className = `btn done-btn`;
  doneBtn.textContent = "Done";
  doneBtn.onclick = () => {
    // save data
    task.dataset.priority = priorList.value;
    task.querySelector(".task-name").textContent = nameField.value;
    task.querySelector(
      ".task-prior"
    ).textContent = `${priorList.value} priority`;
    task.querySelector(".task-start").textContent = startTimeField.value;
    task.querySelector(".task-end").textContent = endTimeField.value;
    task.querySelector(".task-desc").textContent = descField.value;

    let schedule = sortSchedule(scheduleToJson());
    updateSchedule(schedule);
    saveUserInfo({
      schedule: scheduleToJson(),
    });

    overlay.remove();
    taskPropBox.remove();
  };

  let deleteBtn = document.createElement("button");
  deleteBtn.className = `btn delete-btn`;
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    task.remove();
    saveUserInfo({
      schedule: scheduleToJson(),
    });

    overlay.remove();
    taskPropBox.remove();
    setupTodaySettings();
  };

  let cancelBtn = document.createElement("button");
  cancelBtn.className = `btn cancel-btn`;
  cancelBtn.textContent = "Cancel";
  cancelBtn.onclick = () => {
    overlay.remove();
    taskPropBox.remove();
  };

  optionsSection.append(doneBtn, deleteBtn, cancelBtn);

  taskPropBox.append(
    boxTitle,
    closeBtn,
    nameFieldContainer,
    priorFieldContainer,
    startTimeFieldContainer,
    endTimeFieldContainer,
    descFieldContainer,
    optionsSection
  );
  document.body.append(overlay, taskPropBox);
}
