from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.data_access.schemas import Patient, PatientBase, ScheduleBlock, Group
from app.data_access import repository
from typing import List
from sqlalchemy.orm import Session
from app.dependencies import get_db


router = APIRouter(tags=["patients"])


class Payload(BaseModel):
    group_id: str


@router.get("/patients/unassigned", response_model=List[Patient])
async def read_unassigned_patients(db: Session = Depends(get_db)):
    return repository.get_unassigned_patients(db)


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


# not sure best convention here, I was mimicking what I saw above
@router.put("/patients/{patient_id}/group", response_model=Group)
async def set_patient_group(
    patient_id: str, payload: Payload = None, db: Session = Depends(get_db)
):
    group_id = payload.group_id
    return repository.set_patient_group(
        db=db, patient_id=patient_id, group_id=group_id
    )


@router.put("/patients/{patient_id}/remove-group", response_model=bool)
async def remove_patient_group(
    patient_id: str, db: Session = Depends(get_db)
):
    return repository.remove_patient_group(
        db=db, patient_id=patient_id
    )
