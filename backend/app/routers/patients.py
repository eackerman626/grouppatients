from fastapi import APIRouter, Depends
from app.data_access.schemas import Patient, PatientBase, ScheduleBlock
from app.data_access import repository
from typing import List
from sqlalchemy.orm import Session
from app.dependencies import get_db


router = APIRouter(tags=["patients"])


@router.get("/patients", response_model=List[Patient])
async def read_patients(db: Session = Depends(get_db)):
    return repository.get_patients(db)


@router.get("/patients/{patient_id}", response_model=Patient)
async def read_patient(patient_id: str, db: Session = Depends(get_db)):
    return repository.get_patient(db, patient_id)


@router.post("/patients", response_model=Patient)
async def create_patient(patient: PatientBase, db: Session = Depends(get_db)):
    return repository.create_patient(db=db, patient=patient)


@router.get("/patients/{patient_id}/availabilities", response_model=list[ScheduleBlock])
async def read_patient_availability(patient_id: str, db: Session = Depends(get_db)):
    return repository.get_patient_availabilities(db, patient_id)


@router.put("/patients/{patient_id}/availabilities", response_model=list[ScheduleBlock])
async def set_patient_availabilities(
    patient_id: str, schedule_block_ids: list[int], db: Session = Depends(get_db)
):
    return repository.set_patient_availabilities(
        db=db, patient_id=patient_id, schedule_block_ids=schedule_block_ids
    )
