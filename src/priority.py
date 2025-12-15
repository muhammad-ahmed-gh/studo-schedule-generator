#!/usr/bin/env python3

DEFAULT_DAY_END = '16:00'

def add_study_tasks(schedule: list[list[dict]]) -> list:
    new_schedule = [[] for _ in range(7)]
    old_tasks = [[task for task in day if task['isGenerated'] == False]
                 for day in schedule]
    end_times = [
        sorted(day, key=lambda t: t['taskEnd'])[-1]['taskEnd'].split(':')
        if day else DEFAULT_DAY_END.split(':')
        for day in old_tasks
    ]
    for i, day in enumerate(old_tasks):
        for task in day:
            new_schedule[i].append(task)
            if task['taskType'].lower() != 'lecture':
                continue
            study_task = {}
            tomorrow = (i + 1) % 7
            hour, minute = (int(x) for x in end_times[tomorrow])
            study_task['taskName'] = task['taskName']
            study_task['taskStart'] = f'{hour+2:02}:{minute:02}'
            study_task['taskEnd'] = f'{hour+4:02}:{minute:02}'
            study_task['taskPriority'] = task['taskPriority']
            study_task['taskDesc'] = f"Study content of yesterday's {task['taskName']} lecture."
            new_schedule[tomorrow].append(study_task)
            end_times[tomorrow] = (hour + 2, minute)
    return new_schedule
