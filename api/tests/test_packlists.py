from main import app
from fastapi.testclient import TestClient
from queries.packlists import PackListQueries
from models import PackListIn, PacklistOut, Error
from authenticator import authenticator
from typing import Optional, Union



client = TestClient(app)


def fake_get_current_account_data():
    return {"id": 10}


class PacklistQueriesMock:
    def create(self, params: PackListIn, user_id: int) -> PacklistOut:
        packlist = params.dict()
        packlist["user_id"] = user_id
        packlist["id"] = 5
        return PacklistOut(**packlist)

    def get_all(self, user_id: int) -> list[PacklistOut]:
        return [
            PacklistOut(
                name="testing",
                start_date="2023-04-27",
                end_date="2023-04-29",
                country="United States",
                state="Florida",
                city="Miami",
                id=5,
                user_id=user_id,
            )
        ]

    def delete(self, user_id: int, id: int) -> bool:
        return True

    def get_one(self, id: int, user_id: int) -> Optional[PacklistOut]:
        return PacklistOut(
            name="testing",
            start_date="2023-04-27",
            end_date="2023-04-29",
            country="United States",
            state="Florida",
            city="Miami",
            id=5,
            user_id=user_id,
        )

    def update(
        self, id: int, user_id: int, params: PackListIn
    ) -> Union[PacklistOut, Error]:
        packlist = params.dict()
        packlist["user_id"] = user_id
        packlist["id"] = id
        return PacklistOut(**packlist)


def test_create_packlist():
    app.dependency_overrides[PackListQueries] = PacklistQueriesMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    packlist = {
        "name": "testing",
        "start_date": "2023-04-27",
        "end_date": "2023-04-29",
        "country": "United States",
        "state": "Florida",
        "city": "Miami",
    }

    res = client.post("/api/packlist", json=packlist)
    data = res.json()
    assert data["user_id"] == 10
    assert data["id"] == 5

    app.dependency_overrides = {}


def test_get_all_packlists():
    app.dependency_overrides[PackListQueries] = PacklistQueriesMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    res = client.get("/api/packlist")
    data = res.json()
    print(data)
    assert len(data) == 1
    assert data[0]["user_id"] == 10
    app.dependency_overrides = {}


def test_delete_packlist():
    app.dependency_overrides[PackListQueries] = PacklistQueriesMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    res = client.delete("/api/packlist/5")
    assert res.json()
    app.dependency_overrides = {}


def test_get_one_packlist():
    app.dependency_overrides[PackListQueries] = PacklistQueriesMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    res = client.get("/api/packlist/5")
    data = res.json()
    assert data["user_id"] == 10
    assert data["id"] == 5
    app.dependency_overrides = {}


def test_update_packlist():
    app.dependency_overrides[PackListQueries] = PacklistQueriesMock
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    packlist = {
        "name": "testing",
        "start_date": "2023-05-01",
        "end_date": "2023-05-09",
        "country": "United States",
        "state": "New York",
        "city": "Brooklyn",
    }

    res = client.put("/api/packlist/5", json=packlist)
    data = res.json()
    assert data["user_id"] == 10
    assert data["id"] == 5
    app.dependency_overrides = {}
