#!/usr/bin/env python3

from typing import Any

DEFAULT_DAY_END = '16:00'
STUDY_LIMIT = 21  # hour after which no study can occur
MARGIN = 2  # no. of hours after day end before which no study can occur

Task = dict[str, Any]
Day = list[Task]
Schedule = list[Day]

def add_study_tasks(schedule: Schedule) -> Schedule:
    new_schedule: Schedule = [[] for _ in range(7)]
    old_tasks: Schedule = [[task for task in day if not task.get('isGenerated', True)]
                           for day in schedule]
    end_times = [
        sorted(day, key=lambda t: t['taskEnd'])[-1]['taskEnd'].split(':')
        if day else DEFAULT_DAY_END.split(':')
        for day in old_tasks
    ]
    # times when we can start studying
    study_start = [(int(hour) + MARGIN, int(minute)) for hour, minute in end_times]
    studies: Schedule = [[] for _ in range(7)]
    for i, day in enumerate(old_tasks):
        for task in day:
            new_schedule[i].append(task)
            if task['taskType'].lower() != 'lecture':
                continue
            study_task = {}
            tomorrow = (i + 1) % 7
            study_task['taskName'] = task.get('taskName', '?UNKNOWN?')
            study_task['taskType'] = 'study'
            study_task['taskPriority'] = task.get('taskPriority', 'low')
            study_task['taskDesc'] = f"Study content of yesterday's {study_task['taskName']} lecture."
            study_task['isGenerated'] = True
            studies[tomorrow].append(study_task)
    schedule_tasks(studies, study_start, schedule=new_schedule)
    return new_schedule

def schedule_tasks(tasks: Schedule, start: list[tuple[int, int]],
                   *, schedule: Schedule | None = None) -> Schedule:
    schedule = schedule or [[] for _ in range(7)]
    for i, day in enumerate(tasks):
        if not day:
            continue
        tasks_by_priority = sorted(
            day, key=lambda d: \
            {'high': 1, 'medium': 2, 'low': 3}[d.get('taskPriority', 'low')]
        )
        for task in tasks_by_priority:
            hour, minute = start[i]
            duration = 2 if task['taskPriority'] == 'high' else 1
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
                hour, minute = start[j]
            if schedule_full:
                print("Couldn't find time for", task['taskName'], "study.")
                # TODO: propagate error to user
                continue
            task['taskStart'] = f'{hour:02}:{minute:02}'
            task['taskEnd'] = f'{hour+duration:02}:{minute:02}'
            start[j] = (hour + duration, minute)
            schedule[j].append(task)
    return schedule
