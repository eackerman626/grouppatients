import pytest
from fastapi.testclient import TestClient
from calendar import MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY

from app.data_access import schemas
from app.dependencies import seed_patients, delete_patients, seed_schedule_blocks, delete_schedule_blocks
from app.main import app


@pytest.fixture()
def client():
    delete_patients()
    return TestClient(app)


@pytest.fixture()
def patients():
    patients = seed_patients(
        [
            schemas.PatientBase(first_name="Timmy", last_name="Turner"),
            schemas.PatientBase(first_name="Jimmy", last_name="Neutron"),
            schemas.PatientBase(first_name="Lillian", last_name="DeVille"),
        ]
    )
    yield patients
    delete_patients()


@pytest.fixture()
def schedule_blocks():
    session_days = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY]
    session_hours = [(800, 1200), (1200, 1600), (1600, 2000)]
    session_schedule_blocks = [
        schemas.ScheduleBlockBase(
            day_of_week=day, start_time=start, end_time=end)
        for day in session_days
        for (start, end) in session_hours
    ]
    schedule_blocks = seed_schedule_blocks(session_schedule_blocks)
    yield schedule_blocks
    delete_schedule_blocks()
