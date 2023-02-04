from pyexpat import model
from time import time
from sqlalchemy.orm import Session

from . import models, schemas


def get_patient(db: Session, patient_id: str | int):
    return db.query(models.Patient).filter(models.Patient.id == patient_id).first()


def get_patients(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Patient)
        .order_by(models.Patient.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_patient(db: Session, patient: schemas.PatientBase):
    db_patient = models.Patient(
        first_name=patient.first_name,
        last_name=patient.last_name,
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient


def get_patient_availabilities(db: Session, patient_id: str | int):
    patient = db.query(models.Patient).filter(
        models.Patient.id == patient_id).first()
    if patient is None:
        return None
    return patient.availabilities


def set_patient_availabilities(db: Session, patient_id: int, schedule_block_ids: list[int]):
    patient = db.query(models.Patient).filter(
        models.Patient.id == patient_id).first()
    if patient is None:
        return None

    schedule_blocks = (
        db.query(models.ScheduleBlock).filter(
            models.ScheduleBlock.id.in_(schedule_block_ids)).all()
    )
    patient.availabilities = schedule_blocks
    db.commit()

    return schedule_blocks


def create_schedule_block(db: Session, schedule_block: schemas.ScheduleBlockBase):
    db_schedule_block = models.ScheduleBlock(
        day_of_week=schedule_block.day_of_week,
        start_time=schedule_block.start_time,
        end_time=schedule_block.end_time,
    )
    db.add(db_schedule_block)
    db.commit()
    db.refresh(db_schedule_block)
    return db_schedule_block


def get_schedule_blocks(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(models.ScheduleBlock)
        .order_by(models.ScheduleBlock.day_of_week)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_groups(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Group)
        .order_by(models.Group.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_group(db: Session, group_id: str | int):
    return db.query(models.Group).filter(models.Group.id == group_id).first()


def create_group(db: Session, group: schemas.GroupBase):
    db_group = models.Group(
        group_name=group.group_name,
    )
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

    
def get_group_patients(db: Session, group_id: str | int):
    group = db.query(models.Group).filter(
        models.Group.id == group_id).first()
    if group is None:
        return None
    return group.patients


def set_patient_group(db: Session, patient_id: int, group_id: int):
    patient = db.query(models.Patient).filter(
        models.Patient.id == patient_id).first()
    if patient is None:
        return None

    group = db.query(models.Group).filter(
        models.Group.id == group_id).first()
    patient.group = group
    db.commit()

    return group