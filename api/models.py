from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from datetime import date


class Error(BaseModel):
    message: str


class AccountOut(BaseModel):
    id: int
    email: str


class AccountOutWithHashedPassword(AccountOut):
    hashed_password: str


class AccountIn(BaseModel):
    email: str
    password: str


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class PackListIn(BaseModel):
    name: str
    start_date: date
    end_date: date
    country: str
    state: str | None
    city: str


class PacklistOut(PackListIn):
    id: int
    user_id: int


class DateListIn(BaseModel):
    date: str
    description: str | None


class DateListOut(DateListIn):
    id: int
    packing_list_id: int


class ItemsIn(BaseModel):
    name: str
    quantity: int
    is_packed: bool
    packing_list_id: int
    date_list_id: int | None


class ItemsOut(ItemsIn):
    id: int


class WeatherOut(BaseModel):
    daily: object


class CountriesOut(BaseModel):
    id: int
    name: str
    iso3: str


class StatesOut(BaseModel):
    id: int
    name: str


class CitiesOut(BaseModel):
    id: int
    name: str


class CityOut(BaseModel):
    id: int
    name: str
    longitude: float
    latitude: float


class CityOutWithAllInfo(BaseModel):
    id: int
    name: str
    state: str | None
    country: str


class StateOutWithAllInfo(BaseModel):
    id: int
    name: str
    country: str
    latitude: float
    longitude: float


class CountryOutWithAllInfo(BaseModel):
    id: int
    name: str
    latitude: float
    longitude: float
