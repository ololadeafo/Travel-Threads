from fastapi import APIRouter, Depends, Response
from models import ItemsIn, ItemsOut
from authenticator import authenticator
from queries.items import ItemsQueries
from typing import List, Union, Optional
from models import Error

router = APIRouter()


@router.post("/api/packlist/items", response_model=Union[ItemsOut, Error])
def create_items(
    items: ItemsIn,
    response: Response,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: ItemsQueries = Depends(),
):
    user_id = account["id"]
    items = repo.create(user_id, items)
    if items is None:
        response.status_code = 400
    return items


@router.get(
    "/api/packlist/{packing_list_id}/datelist/{date_list_id}/items",
    response_model=Union[List[ItemsOut], Error],
)
def get_all(
    packing_list_id: int,
    date_list_id: int,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: ItemsQueries = Depends(),
):
    user_id = account["id"]
    return repo.get_all(packing_list_id, date_list_id, user_id)


@router.get(
    "/api/packlist/{packing_list_id}/items",
    response_model=Union[List[ItemsOut], Error],
)
def get_all_by_packlist(
    packing_list_id: int,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: ItemsQueries = Depends(),
):
    user_id = account["id"]
    return repo.get_all_by_packlist(packing_list_id, user_id)


@router.get("/api/items/{items_id}", response_model=Optional[ItemsOut])
def get_one(
    items_id: int,
    response: Response,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: ItemsQueries = Depends(),
) -> ItemsOut:
    user_id = account["id"]
    items = repo.get_one(items_id, user_id)
    if items is None:
        response.status_code = 404
    return items


@router.put(
    "/api/packlist/items/{items_id}", response_model=Union[ItemsOut, Error]
)
def update(
    items_id: int,
    items: ItemsIn,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: ItemsQueries = Depends(),
) -> Union[Error, ItemsOut]:
    user_id = account["id"]
    return repo.update(items_id, user_id, items)


@router.delete("/api/items/{items_id}", response_model=bool)
def delete(
    items_id: int,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: ItemsQueries = Depends(),
) -> bool:
    user_id = account["id"]
    return repo.delete(user_id, items_id)
