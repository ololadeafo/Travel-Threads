from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


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


class ThingParams(BaseModel):
    name: str


class Thing(ThingParams):
    id: int
    user_id: str


class ThingsList(BaseModel):
    things: list[Thing]
