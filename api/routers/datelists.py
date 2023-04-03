from fastapi import APIRouter, Depends, Response
from models import  DateListIn, DateListOut, PackListID
from authenticator import authenticator
from queries.datelists import DateListQueries
from typing import List, Optional, Union
from models import Error

router = APIRouter()

@router.post('/api/packlist/datelist', response_model=Union[DateListOut, Error])
def create_date_list(
    date_list: DateListIn,
    response: Response,
    account: dict= Depends(authenticator.get_current_account_data),
    repo: DateListQueries = Depends()
):
    user_id = account['id']
    date_list = repo.create(user_id, date_list)
    if date_list is None:
        response.status_code = 400
    return date_list

@router.get('/api/packlist/{id}/datelist', response_model=Union[List[DateListOut], Error])
def get_all(
    id: int,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: DateListQueries = Depends(),
):
    user_id = account['id']
    return repo.get_all(user_id, id)
