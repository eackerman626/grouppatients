from fastapi import APIRouter, Depends
from app.data_access.schemas import Group, GroupBase
from app.data_access import repository
from typing import List
from sqlalchemy.orm import Session
from app.dependencies import get_db


router = APIRouter(tags=["groups"])


@router.get("/groups", response_model=List[Group])
async def read_groups(db: Session = Depends(get_db)):
    return repository.get_groups(db)


@router.get("/groups/{group_id}", response_model=Group)
async def read_group(group_id: str, db: Session = Depends(get_db)):
    return repository.get_group(db, group_id)


@router.post("/groups", response_model=Group)
async def create_group(group: GroupBase, db: Session = Depends(get_db)):
    return repository.create_group(db=db, group=group)


@router.get("/groups/{group_id}/patients", response_model=list[Patient])
async def read_group_patients(group_id: str, db: Session = Depends(get_db)):
    return repository.get_group_patients(db, group_id)


# @router.put("/patients/{patient_id}/availabilities", response_model=list[ScheduleBlock])
# async def set_patient_availabilities(
#     patient_id: str, schedule_block_ids: list[int], db: Session = Depends(get_db)
# ):
#     return repository.set_patient_availabilities(
#         db=db, patient_id=patient_id, schedule_block_ids=schedule_block_ids
#     )
