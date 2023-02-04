from sqlalchemy import text
from app.data_access.database import SessionLocal
from app.data_access.repository import create_patient, create_schedule_block, set_patient_availabilities, create_group
from app.data_access.schemas import Patient, ScheduleBlock, Group


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def seed_schedule_blocks(schedule_blocks):
    created_schedule_blocks = []
    session_generator = get_db()
    session = next(session_generator, None)
    for schedule_block in schedule_blocks:
        db_schedule_block = create_schedule_block(
            db=session, schedule_block=schedule_block)
        created_schedule_blocks.append(
            ScheduleBlock.from_orm(db_schedule_block))
    return created_schedule_blocks


def seed_patients(patients):
    created_patients = []
    session_generator = get_db()
    session = next(session_generator, None)
    for patient in patients:
        db_patient = create_patient(db=session, patient=patient)
        created_patients.append(Patient.from_orm(db_patient))
    return created_patients


def seed_schedule_blocks_for_patient(patient, schedule_blocks):
    session_generator = get_db()
    session = next(session_generator, None)
    set_patient_availabilities(db=session, patient_id=patient.id, schedule_block_ids=map(
        lambda x: x.id, schedule_blocks))


def truncate_tables(table_names: list[str]):
    session_generator = get_db()
    session = next(session_generator, None)

    for table in table_names:
        drop_query = text(f"TRUNCATE TABLE {table} CASCADE")
        session.execute(drop_query)

    session.commit()


def drop_tables(table_names: list[str]):
    session_generator = get_db()
    session = next(session_generator, None)

    for table in table_names:
        drop_query = text(f"DROP TABLE IF EXISTS {table}")
        session.execute(drop_query)

    session.commit()


def delete_patients():
    session_generator = get_db()
    session = next(session_generator, None)
    drop_query = text("DELETE FROM patients")
    session.execute(drop_query)
    session.commit()


def delete_schedule_blocks():
    session_generator = get_db()
    session = next(session_generator, None)
    drop_query = text("DELETE FROM schedule_blocks")
    session.execute(drop_query)
    session.commit()


def seed_groups(groups):
    created_groups = []
    session_generator = get_db()
    session = next(session_generator, None)
    for group in groups:
        db_group = create_group(db=session, group=group)
        created_groups.append(Group.from_orm(db_group))
    return created_groups