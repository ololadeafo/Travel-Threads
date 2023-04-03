from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from datetime import date

class Error(BaseModel):
    message: str


class AccountOut(BaseModel): # what the front end will need
    id: int
    email: str


class AccountOutWithHashedPassword(AccountOut): # internal (FastAPI) use only
    hashed_password: str # encrypted password


class AccountIn(BaseModel):
    email: str
    password: str # user's password


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
    date: date
    description: str | None
    packing_list_id: int


class DateListOut(DateListIn):
    id: int



class ItemsIn(BaseModel):
    name: str
    quantity: int
    is_packed: bool
    packing_list_id: int
    date_list_id: int | None


class ItemsOut(ItemsIn):
    id: int

class PackListID(BaseModel):
    id:int
