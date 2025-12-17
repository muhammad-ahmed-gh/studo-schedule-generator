#!/usr/bin/env python3

DEFAULT_DAY_END = '16:00'

def add_study_tasks(schedule: list[list[dict]]) -> list:
    newdays = [[] for _ in range(7)]
    days = ([task for task in day
             if task['taskName'].split()[-1] != 'Study']
            or [{'end': DEFAULT_DAY_END}]
            for day in schedule)
    day_endings = [
        sorted(day, key=lambda t: t['end'])[-1]['end'].split(':')
        for day in days
    ]
    for i, day in enumerate(schedule):
        for task in day:
            subject = ' '.join(task['taskName'].split()[:-1])
            type = task['taskName'].split()[-1].lower()
            if type == 'lecture':
                tomorrow = (i + 1) % 7
                hour, minute = [int(x) for x in day_endings[tomorrow]]
                newdays[(i + 1) % 7].append({'taskName': f'{subject} Study',
                                            'start': f'{hour+2:02}:{minute:02}',
                                            'end': f'{hour+4:02}:{minute:02}',
                                            'priority': 'low'})
                day_endings[tomorrow] = (hour+2, minute)
            newdays[i].append(task)
    return newdays
