/**
 * @jest-environment jsdom
 */


let Util, Valid, Task;

beforeAll(async () => {
  ({ Util } = await import("../static/js/Util.js"));
  ({ Valid } = await import("../static/js/Valid.js"));
  ({ Task } = await import("../static/js/Task.js"));
});


describe("Frontend logic tests", () => {
  test("Task.createTask creates a valid task", async () => {
    const task = await Task.createTask(
      "AI",
      "lecture",
      "high",
      "10:00",
      "12:00",
      "Intro to AI",
      false
    );
  
    // Check that the DOM element contains the correct info
    expect(task.querySelector(".task-name").textContent).toBe("AI");
    expect(task.className).toContain("lecture"); // or whatever class Task sets
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
