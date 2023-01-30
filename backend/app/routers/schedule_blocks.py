from fastapi import APIRouter, Depends
from app.data_access.schemas import ScheduleBlock
from app.data_access import repository
from typing import List
from sqlalchemy.orm import Session
from app.dependencies import get_db


router = APIRouter(tags=["schedule_blocks"])


@router.get("/schedule_blocks", response_model=List[ScheduleBlock])
async def read_schedule_blocks(db: Session = Depends(get_db)):
    return repository.get_schedule_blocks(db)
