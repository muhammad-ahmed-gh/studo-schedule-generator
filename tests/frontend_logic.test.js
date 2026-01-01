/**
 * @jest-environment jsdom
 */

const Util = require("../static/js/Util.js");
const Valid = require("../static/js/Valid.js");
const Task = require("../static/js/Task.js");

describe("Frontend logic tests", () => {
  test("Task.createTask creates a valid task", () => {
    const task = Task.createTask(
      "AI",
      "lecture",
      "high",
      "10:00",
      "12:00",
      "Intro to AI",
      false
    );

    expect(task.taskName).toBe("AI");
    expect(task.taskType).toBe("lecture");
    expect(task.isGenerated).toBe(false);
  });

  test("Validation rejects invalid time range", () => {
    expect(Valid.validateNewTask("Task", "14:00", "12:00")).toBe(false);
  });

  test("Validation accepts valid task", () => {
    expect(Valid.validateNewTask("Task", "12:00", "14:00")).toBe(true);
  });

  test("Util.sortSchedule sorts by start time", () => {
    const schedule = [
      [
        { taskStart: "15:00" },
        { taskStart: "09:00" }
      ]
    ];

    const sorted = Util.sortSchedule(schedule);
    expect(sorted[0][0].taskStart).toBe("09:00");
  });
});
