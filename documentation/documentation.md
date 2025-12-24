# Studo: Intelligent Academic Schedule Generator

---

## 📑 Table of Contents

1. [Introduction](#-introduction)
2. [System Architecture](#-system-architecture)
3. [Features](#-features)
4. [How It Works](#️-how-it-works)
5. [Classes Overview](#-classes-overview)
6. [API Documentation](#-api-documentation)
7. [Testing](#-testing)
8. [CI/CD](#-cicd)
9. [Installation & Setup](#-installation--setup)
10. [Future Enhancements](#-future-enhancements)

---

## 📝 Introduction

**Studo** is an intelligent academic schedule generator designed to help students manage their tasks efficiently. By analyzing user-defined tasks, the system automatically generates study sessions based on priorities, ensuring a balanced workload and avoiding burnout. The application is built with a focus on simplicity, usability, and automation.

---

## 🏗 System Architecture

The project follows a **Modular Monolith** architecture, ensuring separation of concerns and maintainability:

1. **Frontend (Presentation Layer):**

   - Built with HTML5, CSS3, and JavaScript.
   - Uses "Open Sans" typography for a clean and modern look.
   - FontAwesome icons are integrated for intuitive and visually appealing UI elements.

2. **Backend (Application Layer):**

   - Powered by Flask, a lightweight Python web framework.
   - Handles routing, API endpoints, and communication between the frontend and the scheduling engine.

3. **Business Logic (Service Layer):**
   - The core scheduling logic resides in the `src/priority.py` file.
   - Implements algorithms for task prioritization, time allocation, and study session generation.

---

## 🚀 Features

### 1. **Task Management**

- Add, edit, and delete tasks directly from the user interface.
- Tasks can be categorized into types such as "Lecture," "Quiz," "Assignment," "Exam," "Study," and "Other."

### 2. **Automated Study Session Generation**

- Automatically generates study sessions for lecture tasks.
- Ensures study sessions are scheduled with appropriate buffers to prevent overloading.

### 3. **Priority-Based Scheduling**

- Tasks are assigned one of five priority levels: `top`, `high`, `medium`, `low`, or `none`.
- Higher-priority tasks are scheduled earlier to ensure timely completion.

### 4. **Responsive Design**

- Fully responsive interface that works seamlessly across devices of all sizes.

### 5. **Local Storage Integration**

- Saves user data (tasks and username) in the browser's local storage for persistence across sessions.

### 6. **Dynamic Updates**

- Real-time updates to the schedule when tasks are added, edited, or deleted.

---

## ⚙️ How It Works

### Task Scheduling Logic

1. **Input:**

   - Users define tasks with attributes such as name, type, priority, start time, end time, and description.

2. **Processing:**

   - The backend processes the schedule to identify lecture tasks and generates corresponding study sessions.
   - Study sessions are scheduled based on:
     - The end time of the last task for the day.
     - A 2-hour buffer to prevent back-to-back tasks.
     - Task priority to determine duration and order.

3. **Output:**
   - The updated schedule is sent back to the frontend and displayed dynamically.

### Key Algorithms

- **Task Sorting:**
  - Tasks are sorted by start time within a day and by priority across days.
- **Study Session Allocation:**
  - Study sessions are allocated to the next available day, ensuring no overlap with existing tasks.

---

## 📦 Classes Overview

### 1. **`Scheduler`** (Backend - `src/priority.py`)

- **Purpose:** Implements the core scheduling logic for generating study tasks.
- **Key Methods:**
  - `generate_study_tasks`: Generates study sessions for lecture tasks.
  - `sort_tasks_by_priority`: Sorts tasks based on their priority levels.
  - `assign_task_times`: Allocates time slots for study tasks while avoiding conflicts.
  - `remove_generated_tasks`: Removes previously generated study tasks to avoid duplication.

### 2. **`Util`** (Frontend - `static/js/Util.js`)

- **Purpose:** Provides utility functions for DOM manipulation and schedule management.
- **Key Methods:**
  - `createEle`: Dynamically creates HTML elements with specified attributes.
  - `setupTodaySettings`: Highlights the current day and displays the number of tasks for the day.
  - `sortSchedule`: Sorts tasks within the schedule by their start times.
  - `updateSchedule`: Updates the DOM to reflect the current schedule.

### 3. **`Task`** (Frontend - `static/js/Task.js`)

- **Purpose:** Manages individual tasks, including their creation, editing, and deletion.
- **Key Methods:**
  - `createTask`: Creates a new task element with the specified attributes.
  - `updateInfo`: Updates the properties of an existing task.
  - `deleteTask`: Deletes a task from the schedule.
  - `showProperties`: Displays a modal for editing task properties.

### 4. **`Valid`** (Frontend - `static/js/Valid.js`)

- **Purpose:** Validates task data to ensure correctness before adding or editing tasks.
- **Key Methods:**
  - `validateNewTask`: Validates the name, start time, and end time of a new task.
  - `validateEditedTask`: Ensures that edited task data is valid and does not conflict with existing tasks.

### 5. **`AppStorage`** (Frontend - `static/js/AppStorage.js`)

- **Purpose:** Handles local storage operations for saving and loading user data.
- **Key Methods:**
  - `scheduleToJson`: Converts the current schedule in the DOM to a JSON representation.
  - `loadUserInfo`: Loads the schedule and username from local storage.
  - `saveSchedule`: Saves the current schedule to local storage.

### 6. **`Main`** (Frontend - `static/js/Main.js`)

- **Purpose:** Initializes the application and sets up event listeners for user interactions.
- **Key Methods:**
  - `init`: Loads user data, sets up buttons, and initializes the schedule.
  - `showAddTaskModal`: Displays a modal for adding new tasks.
  - `setupGenerateBtn`: Sends the current schedule to the backend for generating study tasks.

---

## 📡 API Documentation

### 1. **Homepage**

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Renders the main application interface.

### 2. **Generate Schedule**

- **Endpoint:** `/generate`
- **Method:** `POST`
- **Request Body:** JSON representation of the current schedule.
- **Response:** JSON representation of the updated schedule with generated study sessions.
- **Description:** Processes the schedule and generates study tasks based on the provided input.

---

## 🧪 Testing

The project includes comprehensive test suites to ensure the reliability and correctness of both backend and frontend components.

### Backend Tests (Python)

- **Location:** `tests/test_priority.py` and `tests/test_scheduler_generation.py`
- **Framework:** Uses Python's built-in testing capabilities (e.g., assertions in functions).
- **Coverage:**
  - Tests for the [`Scheduler`](src/priority.py) class, including study task generation, task removal, and priority sorting.
  - Validates logic for generating study tasks based on lecture schedules and handling edge cases like no lectures.
- **Running Tests:** Execute the test files directly with Python, e.g., `python tests/test_priority.py`. For automated testing, integrate with tools like pytest.

### Frontend Tests (JavaScript)

- **Location:** `tests/test_frontend_logic.js`
- **Framework:** Jest with jsdom for DOM simulation.
- **Coverage:**
  - Tests for task creation, validation, and schedule sorting in the frontend classes like [`Task`](static/js/task.js), [`Valid`](static/js/Valid.js), and [`Util`](static/js/util.js).
  - Ensures UI logic, such as form validation and task updates, works correctly.
- **Running Tests:** Use the npm script defined in [`package.json`](package.json): `npm test`.

All tests are designed to run in a CI environment to catch regressions early.

---

## 🔄 CI/CD

The project uses GitHub Actions for Continuous Integration (CI) and Continuous Deployment (CD) to automate testing and deployment processes.

### Continuous Integration (CI)

- **Workflow File:** `.github/workflows/ci.yml`
- **Triggers:** Runs on pushes to the `main` branch and on pull requests.
- **Steps:**
  - Checks out the repository.
  - Sets up Python 3.11.
  - Installs dependencies from [`requirements.txt`](requirements.txt).
  - Verifies that the Flask app can be imported without errors (checks for syntax and import issues).
- **Purpose:** Ensures code quality and that the application starts correctly before merging changes.

### Continuous Deployment (CD)

- **Workflow File:** `.github/workflows/cd.yml`
- **Triggers:** Runs after the CI workflow completes successfully.
- **Steps:**
  - Currently a placeholder that prints a confirmation message: "CI passed. Project is ready for deployment."
- **Purpose:** Prepares for future deployment automation, such as deploying to a cloud service (e.g., Heroku, AWS).

These workflows help maintain code quality and streamline the release process.

---

## 🛠 Installation & Setup

### Prerequisites

- Python 3.8 or higher
- Node.js (optional, for frontend development)
- Flask (Python package)

### Steps

- Clone the repository:

```bash
git clone https://github.com/muhammad-ahmed-gh/schedule-generator.git
cd schedule-generator
```

- Install dependencies

```bash
pip install flask
```

- Run the application

```bash
python app.py
```

- Open the application in your browser:
  - Navigate to `http://127.0.0.1:5000`.

---

## 🔮 Future Enhancements

1. **User Authentication:**

   - Add user accounts to allow multiple users to manage their schedules independently.

2. **Cloud Storage:**

   - Sync schedules to the cloud for access across devices.

3. **Advanced Task Analytics:**

   - Provide insights into task completion rates and time management.

4. **Recurring Tasks:**

   - Support for recurring tasks to simplify long-term planning.

5. **Mobile App:**

   - Develop a mobile version of the application for on-the-go access.

6. **Integration with Calendar Apps:**
   - Sync tasks with Google Calendar, Outlook, or other calendar applications.

---

**Studo** is your companion for smarter academic planning. With its automated scheduling and priority-based task management, it ensures you stay organized and productive. Start planning smarter today!
