from src.priority import Scheduler

def test_study_task_added_next_day():
    schedule = [
        [
            {
                "taskName": "Algorithms",
                "taskType": "lecture",
                "taskPrior": "high",
                "taskStart": "09:00",
                "taskEnd": "11:00",
                "isGenerated": False
            }
        ],
        [], [], [], [], [], []
    ]

    s = Scheduler(schedule)
    new_schedule = s.generate_study_tasks()

    # Study task must be added to next day
    assert len(new_schedule[1]) == 1
    assert new_schedule[1][0]["taskType"] == "study"


def test_no_study_tasks_if_no_lectures():
    schedule = [[{"taskType": "quiz"}], [], [], [], [], [], []]
    s = Scheduler(schedule)

    new_schedule = s.generate_study_tasks()
    assert all(len(day) == len(schedule[i]) for i, day in enumerate(new_schedule))
