from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from calendar import MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY

from .routers import patients, schedule_blocks, groups
from app.data_access.database import engine
from app.data_access import models, schemas
from app.dependencies import seed_patients, seed_schedule_blocks, seed_schedule_blocks_for_patient, drop_tables, truncate_tables

# This creates tables in the database as they are declared in models.py
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patients.router)
app.include_router(schedule_blocks.router)
app.include_router(groups.router)


app_tables = [
    "patients_availabilities",
    "patients",
    "schedule_blocks",
    "groups"
]


session_days = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY]
session_hours = [(800, 1200), (1200, 1600), (1600, 2000)]
session_schedule_blocks = [
    schemas.ScheduleBlockBase(day_of_week=day, start_time=start, end_time=end)
    for day in session_days
    for (start, end) in session_hours
]


@app.on_event("startup")
async def startup_event():
    truncate_tables(app_tables)
    schedule_blocks = seed_schedule_blocks(session_schedule_blocks)
    patients = seed_patients(
        [
            schemas.PatientBase(first_name="Natasha", last_name="Romanoff"),
            schemas.PatientBase(first_name="Carol", last_name="Danvers"),
            schemas.PatientBase(first_name="Wanda", last_name="Maximoff"),
        ]
    )
    for index, patient in enumerate(patients):
        patient_schedule_blocks = [schedule_blocks[index],
                                   schedule_blocks[index + 3], schedule_blocks[index + 6]]
        seed_schedule_blocks_for_patient(
            patient=patient, schedule_blocks=patient_schedule_blocks)


@app.on_event("shutdown")
async def shutdown():
    drop_tables(app_tables)
