from src.priority import Scheduler

def sample_schedule():
    return [
        [
            {
                "taskName": "Math",
                "taskType": "lecture",
                "taskPrior": "high",
                "taskStart": "10:00",
                "taskEnd": "12:00",
                "taskDesc": "",
                "isGenerated": False
            }
        ],
        [], [], [], [], [], []
    ]

def test_remove_generated_tasks():
    sched = sample_schedule()
    sched[0].append({
        "taskName": "Auto",
        "taskType": "study",
        "taskPrior": "low",
        "isGenerated": True
    })

    s = Scheduler(sched)
    cleaned = s.remove_generated_tasks()

    assert len(cleaned[0]) == 1
    assert cleaned[0][0]["taskName"] == "Math"


def test_create_study_task():
    s = Scheduler([])
    lecture = {
        "taskName": "Physics",
        "taskPrior": "top"
    }

    study = s.create_study_task(lecture)

    assert study["taskType"] == "study"
    assert study["isGenerated"] is True
    assert "Physics" in study["taskDesc"]
