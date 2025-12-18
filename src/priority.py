#!/usr/bin/env python3

DEFAULT_DAY_END = '16:00'
Schedule = list[list[dict]]

def add_study_tasks(schedule: Schedule) -> Schedule:
    new_schedule = [[] for _ in range(7)]
    old_tasks = [[task for task in day if not task.get('isGenerated', True)]
                 for day in schedule]
    end_times = [
        sorted(day, key=lambda t: t['taskEnd'])[-1]['taskEnd'].split(':')
        if day else DEFAULT_DAY_END.split(':')
        for day in old_tasks
    ]
    studies = [[] for _ in range(7)]
    for i, day in enumerate(old_tasks):
        for task in day:
            new_schedule[i].append(task)
            if task['taskType'].lower() != 'lecture':
                continue
            study_task = {}
            tomorrow = (i + 1) % 7
            study_task['taskName'] = task['taskName']
            study_task['taskType'] = 'study'
            study_task['taskPriority'] = task['taskPriority']
            study_task['taskDesc'] = f"Study content of yesterday's {task['taskName']} lecture."
            study_task['isGenerated'] = True
            studies[tomorrow].append(study_task)
    schedule_tasks(studies, end_times, schedule=new_schedule)
    return new_schedule

def schedule_tasks(tasks: Schedule, start,
                   *, schedule: Schedule | None = None):
    schedule = schedule or [[] for _ in range(7)]
    for i, day in enumerate(tasks):
        if not day:
            continue
        tasks_by_priority = sorted(
            day, key=lambda d: \
                {'high': 1, 'medium': 2, 'low': 3}[d.get('taskPriority', 'low')]
        )
        for task in tasks_by_priority:
            hour, minute = (int(x) for x in start[i])
            duration = 2 if task['taskPriority'] == 'high' else 1
            task['taskStart'] = f'{hour+2:02}:{minute:02}'
            task['taskEnd'] = f'{hour+2+duration:02}:{minute:02}'
            start[i] = (hour + duration, minute)
            schedule[i].append(task)
    return schedule
