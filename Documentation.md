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
Unlike static calendars, Studo analyzes the string content of your tasks. If a task name contains the keyword "Lecture", the system treats it as a trigger for a future study session.

### 2. Priority-Based Visual Hierarchy
The UI supports three distinct priority data-attributes:
* `top`: Immediate attention required.
* `medium`: Standard academic tasks.
* `low`: Supplemental reading or non-essential study.

### 3. Smart Buffer Management
The system prevents "Back-to-Back Burnout" by referencing a `DEFAULT_DAY_END` and adding a 2-hour buffer between the conclusion of the final daily task and any newly generated study sessions.

---

## ⚙️ Algorithmic Logic (`src/priority.py`)

The scheduling engine uses a list-processing algorithm to transform raw user input into an optimized plan.

```python
# The algorithm performs the following:
1. Identifies the "Lecture" suffix in task names.
2. Calculates the 'tomorrow' index using: (current_day + 1) % 7.
3. Parses 24-hour time strings into integer tuples for math operations.
4. Appends new dictionary objects with 'low' priority to the next day's list.
