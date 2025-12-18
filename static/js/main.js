import { setupMenuBtn, setTitles, setupTodaySettings } from "./chores.js";
import { loadUserInfo, saveUserInfo, scheduleToJson } from "./storage.js";
import { addTaskToSchedule, showTaskProperties } from "./task_ops.js";

let setupTaskClick = function () {
  let tasks = document.querySelectorAll(".task");
  tasks.forEach((task) => (task.onclick = () => showTaskProperties(task)));
};

let showAddTaskProperties = function () {
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

  let priors = ["top", "high", "medium", "low"];
  for (let prior of priors) {
    let option = document.createElement("option");
    option.value = prior;
    option.textContent = prior;
    priorList.appendChild(option);
  }

  let priorFieldContainer = fieldContainer.cloneNode(true);
  priorFieldContainer.append(priorLabel, priorList);

  // day
  let dayLabel = createLabel("task-day-field", "task-prop-label", "Day");

  let dayList = document.createElement("select");
  dayList.id = "task-day-field";
  dayList.className = "task-prop-input-field";

  let days = ["sat", "sun", "mon", "tue", "wed", "thur", "fri"];
  for (let day of days) {
    let option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    dayList.appendChild(option);
  }

  let dayFieldContainer = fieldContainer.cloneNode(true);
  dayFieldContainer.append(dayLabel, dayList);

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

  let startTimeFieldContainer = fieldContainer.cloneNode(true);
  startTimeFieldContainer.append(startTimeLabel, startTimeField);

  // end time
  let endTimeLabel = createLabel("task-end-field", "task-prop-label", "End");
  let endTimeField = document.createElement("input");
  endTimeField.type = "time";
  endTimeField.id = "task-end-field";
  endTimeField.className = "task-prop-input-field";

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

  let descFieldContainer = fieldContainer.cloneNode(true);
  descFieldContainer.append(descLabel, descField);

  // options
  let optionsSection = document.createElement("div");
  optionsSection.className = "options";

  let doneBtn = document.createElement("button");
  doneBtn.className = `btn done-btn`;
  doneBtn.textContent = "Done";
  doneBtn.onclick = () => {
    addTaskToSchedule(
      nameField.value,
      priorList.value,
      dayList.value,
      startTimeField.value,
      endTimeField.value,
      descField.value
    );
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

  optionsSection.append(doneBtn, cancelBtn);

  taskPropBox.append(
    boxTitle,
    closeBtn,
    nameFieldContainer,
    priorFieldContainer,
    dayFieldContainer,
    startTimeFieldContainer,
    endTimeFieldContainer,
    descFieldContainer,
    optionsSection
  );
  document.body.append(overlay, taskPropBox);
};

let setupAddTaskBtn = function () {
  let addTaskBtn = document.querySelector("main .add-task");
  addTaskBtn.onclick = showAddTaskProperties;
};

let updateSchedule = function (schedule) {
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
};

let setupGenerateBtn = function () {
  let generateBtn = document.querySelector("main .generate");
  generateBtn.onclick = function () {
    fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scheduleToJson()),
    })
      .then((response) => response.json())
      .then((schedule) => {
        updateSchedule(schedule);
        saveUserInfo({
          schedule: scheduleToJson(),
        });
        setupTodaySettings();
      });
  };
};

updateSchedule(loadUserInfo());
setupMenuBtn();
setupTaskClick();
setupAddTaskBtn();
setupGenerateBtn();
setupTodaySettings();
