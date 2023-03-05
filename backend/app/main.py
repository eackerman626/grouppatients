from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from calendar import MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY

from .routers import patients, schedule_blocks, groups
from app.data_access.database import engine
from app.data_access import models, schemas
from app.dependencies import seed_patients, seed_schedule_blocks, seed_schedule_blocks_for_patient, drop_tables, truncate_tables, seed_groups, seed_group_for_patient

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
            schemas.PatientBase(first_name="Naomi", last_name="Nagata"),
            schemas.PatientBase(first_name="James", last_name="Holden"),
            schemas.PatientBase(first_name="Amos", last_name="Burton"),
            schemas.PatientBase(first_name="Alex", last_name="Kamal"),
            schemas.PatientBase(first_name="Chrisjen", last_name="Avasarala"),
            schemas.PatientBase(first_name="Bobbie", last_name="Draper"),
        ]
    )
    groups = seed_groups(
        [
            schemas.GroupBase(group_name="First Group"),
            schemas.GroupBase(group_name="Second Group"),
            schemas.GroupBase(group_name="Third Group"),
        ]
    )
    for index, patient in enumerate(patients):
        patient_schedule_blocks = [schedule_blocks[index % 3],
                                   schedule_blocks[index % 3 + 3], schedule_blocks[index % 3 + 6]]
        seed_schedule_blocks_for_patient(
            patient=patient, schedule_blocks=patient_schedule_blocks)
        seed_group_for_patient(
            patient=patient, group=groups[index % 3])


@app.on_event("shutdown")
async def shutdown():
    drop_tables(app_tables)
