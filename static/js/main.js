import * as util from "./util.js";
import { AppStorage } from "./AppStorage.js";
import { Task } from "./Task.js";

class Main {
  static showAddTaskModal() {
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

    // type
    let typeLabel = createLabel("task-type-field", "task-prop-label", "Type");

    let typeList = document.createElement("select");
    typeList.id = "task-type-field";
    typeList.className = "task-prop-input-field";

    let types = ["lecture", "quiz", "assignment", "exam", "study", "other"];
    for (let type of types) {
      let option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      typeList.appendChild(option);
    }

    // default value
    typeList.value = "lecture";

    let typeFieldContainer = fieldContainer.cloneNode(true);
    typeFieldContainer.append(typeLabel, typeList);

    // priority
    let priorLabel = createLabel(
      "task-prior-field",
      "task-prop-label",
      "Priority"
    );

    let priorList = document.createElement("select");
    priorList.id = "task-prior-field";
    priorList.className = "task-prop-input-field";

    let priors = ["top", "high", "medium", "low", "none"];
    for (let prior of priors) {
      let option = document.createElement("option");
      option.value = prior;
      option.textContent = prior;
      priorList.appendChild(option);
    }
    priorList.value = "none";

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
      let task = Task.createTask(
        nameField.value,
        typeList.value,
        priorList.value,
        startTimeField.value,
        endTimeField.value,
        descField.value,
        false
      );
      Task.addToSchedule(task, dayList.value);

      let schedule = AppStorage.scheduleToJson();
      schedule = util.sortSchedule(schedule);
      util.updateSchedule(schedule);
      AppStorage.saveUserInfo({
        schedule: schedule,
      });

      overlay.remove();
      taskPropBox.remove();
      util.setupTodaySettings();
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
      typeFieldContainer,
      priorFieldContainer,
      dayFieldContainer,
      startTimeFieldContainer,
      endTimeFieldContainer,
      descFieldContainer,
      optionsSection
    );
    document.body.append(overlay, taskPropBox);
  }

  static setupAddTaskBtn() {
    let addTaskBtn = document.querySelector("main .add-task");
    addTaskBtn.onclick = Main.showAddTaskModal;
  }

  static setupGenerateBtn() {
    let generateBtn = document.querySelector("main .generate");
    generateBtn.onclick = function () {
      fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(AppStorage.scheduleToJson()),
      })
        .then((response) => response.json())
        .then((schedule) => {
          util.updateSchedule(util.sortSchedule(schedule));
          AppStorage.saveUserInfo({
            schedule: AppStorage.scheduleToJson(),
          });
          util.setupTodaySettings();
        });
    };
  }

  static loadPageInfo() {
    let userInfo = AppStorage.loadUserInfo();
    if (userInfo) util.updateSchedule(userInfo);
  }

  static init() {
    this.loadPageInfo();
    util.setupMenuBtn();
    this.setupAddTaskBtn();
    this.setupGenerateBtn();
    util.setupTodaySettings();
  }
}

Main.init();
