from fastapi import APIRouter, Depends, Response
from models import PackListIn, PacklistOut
from authenticator import authenticator
from queries.packlists import PackListQueries
from typing import List, Optional, Union
from models import Error


router = APIRouter()


@router.post("/api/packlist", response_model=Union[PacklistOut, Error])
def create_pack_list(
    packing_list: PackListIn,
    response: Response,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: PackListQueries = Depends(),
):
    user_id = account["id"]
    pack_list = repo.create(packing_list, user_id)
    if pack_list is None:
        response.status_code = 400
    return pack_list


@router.get("/api/packlist", response_model=Union[List[PacklistOut], Error])
def get_all(
    account: dict = Depends(authenticator.get_current_account_data),
    repo: PackListQueries = Depends(),
):
    user_id = account["id"]
    return repo.get_all(user_id)


@router.get("/api/packlist/{id}", response_model=Optional[PacklistOut])
def get_one(
    id: int,
    response: Response,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: PackListQueries = Depends(),
) -> PacklistOut:
    user_id = account["id"]
    packing_list = repo.get_one(id, user_id)
    if packing_list is None:
        response.status_code = 404
    return packing_list


@router.put("/api/packlist/{id}", response_model=Union[PacklistOut, Error])
def update(
    id: int,
    pack_list: PackListIn,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: PackListQueries = Depends(),
) -> Union[Error, PacklistOut]:
    user_id = account["id"]
    return repo.update(id, user_id, pack_list)


@router.delete("/api/packlist/{id}", response_model=bool)
def delete(
    id: int,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: PackListQueries = Depends(),
) -> bool:
    user_id = account["id"]
    return repo.delete(user_id, id)
