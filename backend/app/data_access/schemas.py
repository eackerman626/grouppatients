from pydantic import BaseModel
from .models import DaysOfWeek


class ScheduleBlockBase(BaseModel):
    day_of_week: DaysOfWeek
    start_time: int
    end_time: int


class ScheduleBlock(ScheduleBlockBase):
    id: int

    class Config:
        orm_mode = True


class GroupBase(BaseModel):
    group_name: str


class Group(GroupBase):
    id: int

    class Config:
        orm_mode = True


class PatientBase(BaseModel):
    first_name: str
    last_name: str
    availabilities: list[ScheduleBlock] = []
    group: Group = None


class Patient(PatientBase):
    id: int

    class Config:
        orm_mode = True
