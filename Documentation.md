# Schedule Generator

# Studo: Intelligent Academic Task Management System


---

## 📑 Table of Contents
1. [System Architecture](#system-architecture)
2. [Detailed Feature Set](#detailed-feature-set)
3. [Algorithmic Logic](#algorithmic-logic)
4. [API Documentation](#api-documentation)
5. [Installation & Setup](#installation--setup)
6. [Future Roadmap](#future-roadmap)

---

## 🏗 System Architecture

The application is built using a **Modular Monolith** pattern:

* **Presentation Layer (Frontend):** A responsive HTML5 interface using the "Open Sans" typography system and FontAwesome 6.0 for intuitive iconography.
* **Application Layer (Backend):** A Flask (Python) micro-framework handling routing and request/response cycles.
* **Logic Layer (Service):** A dedicated `src/` directory containing the `priority.py` engine, separating business logic from web delivery.

---

## 🚀 Detailed Feature Set

### 1. Automated Study Induction
Unlike static calendars, Studo analyzes the content of your tasks. If a task has the type "Lecture", the system treats it as a trigger for a future study session.

### 2. Priority-Based Visual Hierarchy
The UI supports five distinct priority data-attributes, depending on the priority that the user wants to give each task:
* `top`
* `high`
* `medium`
* `low`
* `none`

### 3. Smart Buffer Management
The system prevents "Back-to-Back Burnout" by adding a 2-hour buffer between the conclusion of the final daily task and any newly generated study sessions.  It will also move study sessions to different days depending on available time.

---

## ⚙️ Algorithmic Logic (`src/priority.py`)

The scheduling engine uses a list-processing algorithm to transform raw user input into an optimized plan.

The engine extracts lecture items out of the schedule and schedules study sessions, setting their times, dates and durations depending on each day's end-time and user-set priorities.
