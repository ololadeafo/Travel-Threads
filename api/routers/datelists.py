from fastapi import APIRouter, Depends, Response
from models import  DateListIn, DateListOut
from authenticator import authenticator
from queries.datelists import DateListQueries
from typing import List, Union
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

@router.get('/api/packlist/{packing_list_id}/datelist', response_model=Union[List[DateListOut], Error])
def get_all(
    packing_list_id: int,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: DateListQueries = Depends(),
):
    user_id = account['id']
    return repo.get_all(user_id, packing_list_id)

# @router.get('/api/packlist/{packing_list_id}/datelist/{date_list_id}', response_model=Optional[DateListOut])
# def get_one(
#     packing_list_id : int,
#     date_list_id: int,
#     response: Response,
#     account: dict = Depends(authenticator.get_current_account_data),
#     repo: DateListQueries = Depends(),
# ) -> DateListOut:
#     user_id = account['id']
#     date_list = repo.get_one(date_list_id, user_id, packing_list_id)
#     if date_list is None:
#         response.status_code = 404
#     return date_list

@router.put('/api/packlist/{packing_list_id}/datelist/{date_list_id}', response_model=Union[DateListOut, Error])
def update(
    packing_list_id: int,
    date_list_id: int,
    date_list: DateListIn,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: DateListQueries = Depends(),
) -> Union[Error, DateListOut]:
    user_id = account['id']
    return repo.update(packing_list_id, date_list_id, user_id, date_list)
