#!/usr/bin/env python3

from typing import Any

DEFAULT_DAY_END = '16:00'
STUDY_LIMIT = 21  # hour after which no study can occur
MARGIN = 2  # no. of hours after day end before which no study can occur

Task = dict[str, Any]
Day = list[Task]
Schedule = list[Day]

class Scheduler:
    schedule: Schedule
    # times when we can start studying
    study_start: list[tuple[int, int]]
    
    def __init__(self, schedule: Schedule):
        self.schedule = schedule

    def create_study_task(self, lecture) -> Task:
        study_task = {}
        study_task['taskName'] = lecture.get('taskName', '?UNKNOWN?')
        study_task['taskType'] = 'study'
        study_task['taskPrior'] = lecture.get('taskPrior', 'none')
        study_task['taskDesc'] = f"Study content of the previous {study_task['taskName']} lecture."
        study_task['isGenerated'] = True
        return study_task

    def empty_schedule(self) -> Schedule:
        return [[] for _ in range(7)]

    def remove_generated_tasks(self) -> Schedule:
        return [[task for task in day if not task.get('isGenerated', True)]
                for day in self.schedule]

    def sort_day(self, day: Day) -> Day:
        return sorted(day, key=lambda t: t['taskEnd'])

    def sort_tasks_by_priority(self, tasks: list[Task]) -> list[Task]:
        def priority_to_ord(task: Task) -> int:
            priorities = {
                'top': 1,
                'high': 2,
                'medium': 3,
                'low': 4,
                'none': 5,
            }
            return priorities[task['taskPrior']]

        return sorted(tasks, key=priority_to_ord)

    def generate_study_tasks(self) -> Schedule:
        new_schedule: Schedule = self.empty_schedule()
        old_tasks: Schedule = self.remove_generated_tasks()
        end_times = [
            self.sort_day(day)[-1]['taskEnd'].split(':')
            if day else DEFAULT_DAY_END.split(':')
            for day in old_tasks
        ]
        self.study_start = [(int(hour) + MARGIN, int(minute))
                            for hour, minute in end_times]
        self.study_tasks: Schedule = self.empty_schedule()
        for i, day in enumerate(old_tasks):
            for task in day:
                new_schedule[i].append(task)
                if task['taskType'].lower() != 'lecture':
                    continue
                tomorrow = (i + 1) % 7
                study_task = self.create_study_task(task)
                self.study_tasks[tomorrow].append(study_task)
        self.schedule = new_schedule
        self.assign_task_times()
        return new_schedule

    def assign_task_times(self):
        for i, day in enumerate(self.study_tasks):
            if not day:
                continue
            tasks_by_priority = self.sort_tasks_by_priority(day)
            for task in tasks_by_priority:
                hour, minute = self.study_start[i]
                duration = 2 if task['taskPrior'] in {'high', 'top'} else 1
                j = i
                schedule_full = False
                for k in range(7):
                    if hour + duration < STUDY_LIMIT:
                        break
                    elif k == 6:
                        schedule_full = True
                        break
                    print(j)
                    j = (i + k) % 7
                    hour, minute = self.study_start[j]
                if schedule_full:
                    print("Couldn't find time for", task['taskName'], "study.")
                    # TODO: propagate error to user
                    continue
                task['taskStart'] = f'{hour:02}:{minute:02}'
                task['taskEnd'] = f'{hour+duration:02}:{minute:02}'
                self.study_start[j] = (hour + duration, minute)
                self.schedule[j].append(task)
