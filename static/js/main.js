/**************************************
 * MENU BUTTON
 **************************************/
function setupMenuBtn() {
  const menuBtn = document.querySelector("header .bars");
  if (!menuBtn) return;

  menuBtn.onclick = () =>
    menuBtn.parentElement.classList.toggle("open");  
}

/**************************************
 * TITLE TOOLTIP SETUP
 **************************************/
function setTitles() {
  const taskNames = document.querySelectorAll(".task .task-name");
  for (let taskName of taskNames) taskName.title = taskName.textContent;

  const taskDescs = document.querySelectorAll(".task .task-desc");
  for (let taskDesc of taskDescs) taskDesc.title = taskDesc.textContent;
}

/**************************************
 * SHOW TASK PROPERTIES MODAL
 **************************************/
function showTaskProperties() {
  const taskPropBox = document.createElement("div");
  const overlay = document.createElement("div");

  taskPropBox.className = "task-prop-box";
  overlay.className = "overlay";

  taskPropBox.innerHTML = `
    <span class="task-prop-box-title">Task Properties</span>
    <button class="close-btn">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="task-prop-field">
      <label class="task-prop-label">Name</label>
      <input type="text" id="task-name-field" class="task-prop-input-field"/>
    </div>

    <div class="task-prop-field">
      <label class="task-prop-label">Priority</label>
      <select id="task-prior-field" class="task-prop-input-field">
        <option value="top">Top</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>

    <div class="task-prop-field">
      <label class="task-prop-label">Start</label>
      <input type="time" id="task-start-field" class="task-prop-input-field"/>
    </div>

    <div class="task-prop-field">
      <label class="task-prop-label">End</label>
      <input type="time" id="task-end-field" class="task-prop-input-field"/>
    </div>

    <div class="task-prop-field">
      <label class="task-prop-label">Description</label>
      <textarea id="task-desc-field" class="task-prop-input-field"></textarea>
    </div>

    <div class="options">
      <button class="btn done-btn">Done</button>
      <button class="btn cancel-btn">Cancel</button>
    </div>
  `;

  function handler(e) {
    // Cancel or X
    if (
      e.target.classList.contains("cancel-btn") ||
      e.target.parentElement?.classList?.contains("close-btn")
    ) {
      overlay.remove();
      taskPropBox.remove();
      document.removeEventListener("click", handler);
    }

    // DONE → create new task
    else if (e.target.classList.contains("done-btn")) {
      const name = document.getElementById("task-name-field").value || "New Task";
      const prior = document.getElementById("task-prior-field").value;
      const start = document.getElementById("task-start-field").value || "--:--";
      const end = document.getElementById("task-end-field").value || "--:--";
      const desc = document.getElementById("task-desc-field").value || "";

      const taskObj = {
        taskName: name,
        priority: prior,
        start: start,
        end: end,
        description: desc
      };

      addTaskToToday(taskObj);

      overlay.remove();
      taskPropBox.remove();
      document.removeEventListener("click", handler);
    }
  }

  document.addEventListener("click", handler);
  document.body.appendChild(overlay);
  document.body.appendChild(taskPropBox);
}

/**************************************
 * CLICK BEHAVIOR FOR EXISTING TASKS
 **************************************/
function setupTaskClick() {
  const tasks = document.querySelectorAll(".task");
  for (let task of tasks) {
    task.onclick = showTaskProperties;
  }
}

/**************************************
 * ADD TASK INTO TODAY COLUMN
 **************************************/
function addTaskToToday(task) {
  const today = document.querySelector(".day.today .tasks");
  if (!today) return;

  const div = document.createElement("div");
  div.classList.add("task");

  const p = task.priority.toLowerCase();
  if (p === "top") div.classList.add("top-prior");
  if (p === "high") div.classList.add("high-prior");
  if (p === "medium") div.classList.add("mid-prior");
  if (p === "low") div.classList.add("low-prior");

  div.innerHTML = `
    <span class="task-name">${task.taskName}</span>
    <span class="task-prior">${task.priority} Priority</span>
    <span class="task-start">${task.start}</span>
    <span class="task-end">${task.end}</span>
    <p class="task-desc">${task.description}</p>
  `;

  div.onclick = showTaskProperties;
  today.appendChild(div);

  setTitles();
}

/**************************************
 * READ CURRENT TASKS FROM DOM
 **************************************/
function getPriorityFromClass(taskEl) {
  if (taskEl.classList.contains("top-prior")) return "top";
  if (taskEl.classList.contains("high-prior")) return "high";
  if (taskEl.classList.contains("mid-prior")) return "medium";
  if (taskEl.classList.contains("low-prior")) return "low";
  return "low";
}

function readScheduleFromDOM() {
  const dayColumns = document.querySelectorAll(".schedule .day");
  const schedule = [];

  dayColumns.forEach((dayEl) => {
    const tasks = [];
    const taskEls = dayEl.querySelectorAll(".tasks .task");

    taskEls.forEach((t) => {
      tasks.push({
        taskName: t.querySelector(".task-name")?.textContent.trim() || "",
        start: t.querySelector(".task-start")?.textContent.trim() || "",
        end: t.querySelector(".task-end")?.textContent.trim() || "",
        description: t.querySelector(".task-desc")?.textContent.trim() || "",
        priority: getPriorityFromClass(t),
      });
    });

    schedule.push(tasks);
  });

  return schedule;
}

/**************************************
 * RENDER FULL SCHEDULE TO UI
 **************************************/
function renderSchedule(schedule) {
  const dayColumns = document.querySelectorAll(".schedule .day");

  schedule.forEach((tasks, idx) => {
    const dayEl = dayColumns[idx];
    const container = dayEl.querySelector(".tasks");
    container.innerHTML = "";

    tasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task");

      const p = task.priority.toLowerCase();
      if (p === "top") div.classList.add("top-prior");
      if (p === "high") div.classList.add("high-prior");
      if (p === "medium") div.classList.add("mid-prior");
      if (p === "low") div.classList.add("low-prior");

      div.innerHTML = `
        <span class="task-name">${task.taskName}</span>
        <span class="task-prior">${task.priority} Priority</span>
        <span class="task-start">${task.start}</span>
        <span class="task-end">${task.end}</span>
        <p class="task-desc">${task.description}</p>
      `;

      div.onclick = showTaskProperties;
      container.appendChild(div);
    });
  });

  setTitles();
}

/**************************************
 * GENERATE → CALL BACKEND
 **************************************/
async function handleGenerateClick() {
  try {
    const schedule = readScheduleFromDOM();

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule }),
    });

    const data = await response.json();
    renderSchedule(data.schedule);

  } catch (err) {
    console.error("Generate error:", err);
    alert("An error occurred. Check console.");
  }
}

/**************************************
 * BUTTON SETUP
 **************************************/
function setupButtons() {
  document.querySelector(".add-task")?.addEventListener("click", showTaskProperties);
  document.querySelector(".generate")?.addEventListener("click", handleGenerateClick);
}

/**************************************
 * INITIALIZE EVERYTHING
 **************************************/
document.addEventListener("DOMContentLoaded", () => {
  setupMenuBtn();
  setTitles();
  setupTaskClick();
  setupButtons();
});
