import { Util } from "./Util.js";
import { AppStorage } from "./AppStorage.js";
import { Task } from "./Task.js";
import { Valid } from "./Valid.js";

class Main {
  static showAddTaskModal() {
    let taskPropBox = Util.createEle({
      tagName: "div",
      className: "task-prop-box",
    });

    let overlay = Util.createEle({
      tagName: "div",
      className: "overlay",
    });

    // create box content
    // box title
    let boxTitle = Util.createEle({
      tagName: "span",
      className: "task-prop-box-title",
      textContent: "task properties",
    });

    // close box button
    let closeIcon = Util.createEle({
      tagName: "i",
      className: "fa-solid fa-xmark",
    });

    let closeBtn = Util.createEle({
      tagName: "button",
      className: "close-btn",
    });

    closeBtn.appendChild(closeIcon);
    closeBtn.onclick = () => {
      overlay.remove();
      taskPropBox.remove();
    };

    // add input fields
    let fieldContainer = Util.createEle({
      tagName: "div",
      className: "task-prop-field",
    });
    // name
    let nameLabel = Util.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "Name",
    });
    nameLabel.setAttribute("for", "task-name-field");

    let nameField = Util.createEle({
      tagName: "input",
      className: "task-prop-input-field",
      id: "task-name-field",
    });
    nameField.type = "text";

    let nameFieldContainer = fieldContainer.cloneNode(true);
    nameFieldContainer.append(nameLabel, nameField);

    // type
    let typeLabel = Util.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "Type",
    });
    nameLabel.setAttribute("for", "task-type-field");

    let typeList = Util.createEle({
      tagName: "select",
      className: "task-prop-input-field",
      id: "task-type-field",
    });

    let types = ["lecture", "quiz", "assignment", "exam", "study", "other"];
    for (let type of types) {
      let option = Util.createEle({
        tagName: "option",
        textContent: type,
      });
      option.value = type;
      typeList.appendChild(option);
    }

    // default value
    typeList.value = "lecture";

    let typeFieldContainer = fieldContainer.cloneNode(true);
    typeFieldContainer.append(typeLabel, typeList);

    // priority
    let priorLabel = Util.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "Priority",
    });
    priorLabel.setAttribute("for", "task-prior-field");

    let priorList = Util.createEle({
      tagName: "select",
      className: "task-prop-input-field",
      id: "task-prior-field",
    });

    let priors = ["top", "high", "medium", "low", "none"];
    for (let prior of priors) {
      let option = Util.createEle({
        tagName: "option",
        textContent: prior,
      });
      option.value = prior;
      priorList.appendChild(option);
    }
    priorList.value = "none";

    let priorFieldContainer = fieldContainer.cloneNode(true);
    priorFieldContainer.append(priorLabel, priorList);

    // day
    let dayLabel = Util.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "Day",
    });
    dayLabel.setAttribute("for", "task-day-field");

    let dayList = Util.createEle({
      tagName: "select",
      className: "task-prop-input-field",
      id: "task-day-field",
    });

    let days = ["sat", "sun", "mon", "tue", "wed", "thur", "fri"];
    for (let day of days) {
      let option = Util.createEle({
        tagName: "option",
        textContent: day,
      });
      option.value = day;
      dayList.appendChild(option);
    }

    let dayFieldContainer = fieldContainer.cloneNode(true);
    dayFieldContainer.append(dayLabel, dayList);

    // start time
    let startTimeLabel = Util.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "Start",
    });
    startTimeLabel.setAttribute("for", "task-start-field");

    let startTimeField = Util.createEle({
      tagName: "input",
      id: "task-start-field",
      className: "task-prop-input-field",
    });
    startTimeField.type = "time";

    let startTimeFieldContainer = fieldContainer.cloneNode(true);
    startTimeFieldContainer.append(startTimeLabel, startTimeField);

    // end time
    let endTimeLabel = Util.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "End",
    });
    endTimeLabel.setAttribute("for", "task-end-field");

    let endTimeField = Util.createEle({
      tagName: "input",
      className: "task-prop-input-field",
      id: "task-end-field",
    });
    endTimeField.type = "time";

    let endTimeFieldContainer = fieldContainer.cloneNode(true);
    endTimeFieldContainer.append(endTimeLabel, endTimeField);

    // description
    let descLabel = Util.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "Description",
    });
    descLabel.setAttribute("for", "task-desc-field");

    let descField = Util.createEle({
      tagName: "textarea",
      className: "task-prop-input-field",
      id: "task-desc-field",
    });

    let descFieldContainer = fieldContainer.cloneNode(true);
    descFieldContainer.append(descLabel, descField);

    // options
    let optionsSection = Util.createEle({
      tagName: "div",
      className: "options",
    });

    let doneBtn = Util.createEle({
      tagName: "button",
      className: "btn done-btn",
      textContent: "Done",
    });
    doneBtn.onclick = () => {
      if (
        Valid.validateNewTask(
          nameField.value,
          startTimeField.value,
          endTimeField.value
        )
      ) {
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
        schedule = Util.sortSchedule(schedule);
        Util.updateSchedule(schedule);
        AppStorage.saveSchedule({
          schedule: schedule,
        });

        overlay.remove();
        taskPropBox.remove();
        Util.setupTodaySettings();
      }
    };

    let cancelBtn = Util.createEle({
      tagName: "button",
      className: "btn cancel-btn",
      textContent: "Cancel",
    });
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

  static setupEditUserBtn() {
    let editUserBtn = document.querySelector(".edit-user");
    let userNameText = document.querySelector(".user .text");

    userNameText.setAttribute("contenteditable", false);

    editUserBtn.onclick = () => {
      userNameText.setAttribute("contenteditable", true);
      userNameText.focus();

      let oldUserName = userNameText.textContent;
      userNameText.onblur = () => {
        userNameText.setAttribute("contenteditable", false);
        if (userNameText.textContent === "")
          userNameText.textContent = oldUserName;

        window.localStorage.setItem("username", userNameText.textContent);
      };
    };
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
          Util.updateSchedule(Util.sortSchedule(schedule));
          AppStorage.saveSchedule({
            schedule: AppStorage.scheduleToJson(),
          });
          Util.setupTodaySettings();
        });
    };
  }

  static loadPageInfo() {
    let data = AppStorage.loadUserInfo();
    if (data.schedule) Util.updateSchedule(data.schedule);

    let userNameText = document.querySelector(".user .text");
    userNameText.textContent = data.username || "Awesome Student";
  }

  static init() {
    this.loadPageInfo();
    this.setupEditUserBtn();
    Util.setupMenuBtn();
    this.setupAddTaskBtn();
    this.setupGenerateBtn();
    Util.setupTodaySettings();
  }
}

Main.init();
