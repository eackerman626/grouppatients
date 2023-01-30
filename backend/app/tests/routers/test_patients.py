def test_get_patients_returns_empty(client):
    response = client.get("/patients")
    assert response.status_code == 200
    patients_response = response.json()
    assert len(patients_response) == 0


def test_get_patients(client, patients):
    response = client.get("/patients")
    assert response.status_code == 200
    patients_response = response.json()
    assert len(patients_response) == 3
    for patient in patients:
        assert patient.dict() in patients_response


def test_create_patients(client):
    response = client.post(
        "/patients", json={"first_name": "test_first", "last_name": "test_last"}
    )
    assert response.status_code == 200
    patient_response = response.json()
    assert patient_response["first_name"] == "test_first"
    assert patient_response["last_name"] == "test_last"
