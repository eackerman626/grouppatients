from calendar import FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY
import enum
from sqlalchemy import (
    Column,
    Enum,
    ForeignKey,
    Integer,
    Text,
    UniqueConstraint,
    Table,
    CheckConstraint,
)
from sqlalchemy.orm import relationship
from .database import Base


patients_availabilities_table = Table(
    "patients_availabilities",
    Base.metadata,
    Column("patient_id", ForeignKey("patients.id")),
    Column("schedule_block_id", ForeignKey("schedule_blocks.id")),
)


class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(Text, nullable=False)
    last_name = Column(Text, nullable=False)
    availabilities = relationship(
        "ScheduleBlock", secondary=patients_availabilities_table)


class DaysOfWeek(enum.Enum):
    monday = MONDAY
    tuesday = TUESDAY
    wednesday = WEDNESDAY
    thursday = THURSDAY
    friday = FRIDAY
    saturday = SATURDAY
    sunday = SUNDAY


class ScheduleBlock(Base):
    __tablename__ = "schedule_blocks"
    id = Column(Integer, primary_key=True, index=True)
    day_of_week = Column(Enum(DaysOfWeek), nullable=False)
    # 3 or 4 digit integer, representing time as hhmm
    start_time = Column(Integer, nullable=False)
    # 3 or 4 digit integer, repesenting time as hhmm
    end_time = Column(Integer, nullable=False)
    __table_args__ = (
        UniqueConstraint("day_of_week", "start_time", "end_time"),
        CheckConstraint("start_time >= 0 AND start_time < 2400",
                        "valid_start_time"),
        CheckConstraint("end_time >= 0 AND end_time < 2400", "valid_end_time"),
    )
