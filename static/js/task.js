import * as chores from "./chores.js";
import * as storage from "./storage.js";

export class Task {
  static deleteTask(task) {
    task.remove();
    storage.saveUserInfo({
      schedule: storage.scheduleToJson(),
    });
    chores.setupTodaySettings();
  }

  static updateInfo(task, name, type, prior, start, end, desc) {
    task.dataset.priority = prior;
    task.querySelector(".task-name").textContent = name;
    task.querySelector(".task-name").title = name;
    task.querySelector(".task-type").textContent = type;
    task.querySelector(".task-prior").textContent = `${prior} priority`;
    task.querySelector(".task-start").textContent = start;
    task.querySelector(".task-end").textContent = end;
    task.querySelector(".task-desc").textContent = desc;
    task.querySelector(".task-desc").title = desc;
  }

  static showProperties(task) {
    let taskPropBox = chores.createEle({
      tagName: "div",
      className: "task-prop-box",
    });

    let overlay = chores.createEle({
      tagName: "div",
      className: "overlay",
    });


    // create box content
    // box title
    let boxTitle = chores.createEle({
      tagName: "span",
      className: "task-prop-box-title",
      textContent: "task properties",
    });

    // close box button
    let closeIcon = chores.createEle({
      tagName: "i",
      className: "fa-solid fa-xmark",
    });
    let closeBtn = chores.createEle({
      tagName: "button",
      className: "close-btn",
    });
    closeBtn.appendChild(closeIcon);
    closeBtn.onclick = () => {
      overlay.remove();
      taskPropBox.remove();
    };

    // add input fields
    let fieldContainer = chores.createEle({
      tagName: "div",
      className: "task-prop-field",
    });

    // name
    let nameLabel = chores.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "Name",
    });
    nameLabel.setAttribute("for", "task-name-field");

    let nameField = chores.createEle({
      tagName: "input",
      className: "task-prop-input-field",
      id: "task-name-field",
    });
    nameField.type = "text";
    nameField.value = task.querySelector(".task-name").textContent;

    let nameFieldContainer = fieldContainer.cloneNode(true);
    nameFieldContainer.append(nameLabel, nameField);

    // type
    let typeLabel = chores.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "Type",
    });
    typeLabel.setAttribute("for", "task-type-field");

    let typeList = chores.createEle({
      tagName: "select",
      className: "task-prop-input-field",
      id: "task-type-field",
    });

    let types = ["lecture", "quiz", "assignment", "exam", "studytime", "other"];
    for (let type of types) {
      let option = chores.createEle({
        tagName: "option",
        textContent: type,
      });
      option.value = type;
      typeList.appendChild(option);
    }

    typeList.value = task.querySelector(".task-type").textContent;

    let typeFieldContainer = fieldContainer.cloneNode(true);
    typeFieldContainer.append(typeLabel, typeList);

    // priority
    let priorLabel = chores.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "Priority",
    });
    priorLabel.setAttribute("for", "task-prior-field");

    let priorList = chores.createEle({
      tagName: "select",
      className: "task-prop-input-field",
      id: "task-prior-field",
    });

    let priors = ["top", "high", "medium", "low"];
    for (let prior of priors) {
      let option = chores.createEle({
        tagName: "option",
        textContent: prior,
      });
      option.value = prior;
      priorList.appendChild(option);
    }
    priorList.value = task.dataset.priority;

    let priorFieldContainer = fieldContainer.cloneNode(true);
    priorFieldContainer.append(priorLabel, priorList);

    // start time
    let startTimeLabel = chores.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "Start",
    });
    startTimeLabel.setAttribute("for", "task-start-field");

    let startTimeField = chores.createEle({
      tagName: "input",
      className: "task-prop-input-field",
      id: "task-start-field",
    });
    startTimeField.type = "time";
    startTimeField.value = task.querySelector(".task-start").textContent;

    let startTimeFieldContainer = fieldContainer.cloneNode(true);
    startTimeFieldContainer.append(startTimeLabel, startTimeField);

    // end time
    let endTimeLabel = chores.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "End",
    });
    endTimeLabel.setAttribute("for", "task-end-field");

    let endTimeField = chores.createEle({
      tagName: "input",
      className: "task-prop-input-field",
      id: "task-end-field",
    });
    endTimeField.type = "time";
    endTimeField.value = task.querySelector(".task-end").textContent;

    let endTimeFieldContainer = fieldContainer.cloneNode(true);
    endTimeFieldContainer.append(endTimeLabel, endTimeField);

    // description
    let descLabel = chores.createEle({
      tagName: "label",
      className: "task-prop-label",
      textContent: "Description",
    });
    descLabel.setAttribute("for", "task-desc-field");

    let descField = chores.createEle({
      tagName: "textarea",
      className: "task-prop-input-field",
      id: "task-desc-field",
    });
    descField.value = task.querySelector(".task-desc").textContent;

    let descFieldContainer = fieldContainer.cloneNode(true);
    descFieldContainer.append(descLabel, descField);

    // options
    let optionsSection = chores.createEle({
      tagName: "div",
      className: "options",
    });

    let doneBtn = chores.createEle({
      tagName: "button",
      className: "btn done-btn",
      textContent: "Done",
    });
    doneBtn.onclick = () => {
      this.updateInfo(
        task,
        nameField.value,
        typeList.value,
        priorList.value,
        startTimeField.value,
        endTimeField.value,
        descField.value
      );

      let schedule = chores.sortSchedule(storage.scheduleToJson());
      chores.updateSchedule(schedule);
      storage.saveUserInfo({
        schedule: storage.scheduleToJson(),
      });

      overlay.remove();
      taskPropBox.remove();
    };

    let deleteBtn = chores.createEle({
      tagName: "button",
      className: "btn delete-btn",
      textContent: "Delete",
    });
    deleteBtn.onclick = () => {
      this.deleteTask(task);
      overlay.remove();
      taskPropBox.remove();
    };

    let cancelBtn = chores.createEle({
      tagName: "button",
      className: "btn cancel-btn",
      textContent: "Cancel",
    });
    cancelBtn.onclick = () => {
      overlay.remove();
      taskPropBox.remove();
    };

    optionsSection.append(doneBtn, deleteBtn, cancelBtn);

    taskPropBox.append(
      boxTitle,
      closeBtn,
      nameFieldContainer,
      typeFieldContainer,
      priorFieldContainer,
      startTimeFieldContainer,
      endTimeFieldContainer,
      descFieldContainer,
      optionsSection
    );
    document.body.append(overlay, taskPropBox);
  }

  static createTask(name, type, prior, start, end, desc, isGenerated) {
    let task = chores.createEle({
      tagName: "div",
      className: "task",
    });
    task.className = "task";
    task.dataset.priority = prior;
    task.dataset.isGenerated = (isGenerated ? "true" : "false");

    let taskNameSpan = chores.createEle({
      taskName: "span",
      className: "task-name",
      textContent: name,
      title: name,
    });

    let taskTypeSpan = chores.createEle({
      taskName: "span",
      className: "task-type",
      textContent: type,
    });

    let taskPriorSpan = chores.createEle({
      taskName: "span",
      className: "task-prior",
      textContent: `${prior} priority`,
    });

    let taskStartSpan = chores.createEle({
      taskName: "span",
      className: "task-start",
      textContent: start,
    });

    let taskEndSpan = chores.createEle({
      taskName: "span",
      className: "task-end",
      textContent: end,
    });

    let taskDescPar = chores.createEle({
      taskName: "p",
      className: "task-desc",
      textContent: desc,
      title: desc,
    });

    task.append(
      taskNameSpan,
      taskTypeSpan,
      taskPriorSpan,
      taskStartSpan,
      taskEndSpan,
      taskDescPar
    );

    task.onclick = function () {
      Task.showProperties(task);
    };

    return task;
  }

  static addToSchedule(task, taskDay) {
    let days = document.querySelectorAll(".schedule .day");
    days.forEach((day) => {
      let dayName = day.querySelector(".head").textContent;
      if (dayName.toLowerCase().trim() === taskDay.toLowerCase().trim()) {
        day.querySelector(".tasks").appendChild(task);
      }
    });
  }
}
