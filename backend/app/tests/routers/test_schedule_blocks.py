from app.data_access.models import DaysOfWeek


def test_get_schedule_blocks_returns_empty(client):
    response = client.get("/schedule_blocks")
    assert response.status_code == 200
    schedule_blocks_response = response.json()
    assert len(schedule_blocks_response) == 0


def test_get_schedule_blocks(client, schedule_blocks):
    response = client.get("/schedule_blocks")
    assert response.status_code == 200
    schedule_blocks_response = response.json()
    assert len(schedule_blocks) == 15
    for schedule_block in schedule_blocks:
        assert dict(
            day_of_week=DaysOfWeek(schedule_block.day_of_week).value,
            start_time=schedule_block.start_time,
            end_time=schedule_block.end_time,
            id=schedule_block.id
        ) in schedule_blocks_response
