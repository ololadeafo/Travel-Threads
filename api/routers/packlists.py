from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
from models import PackListIn, PacklistOut, DateListIn, DateListOut, ItemsIn, ItemsOut
from authenticator import authenticator
from queries.packlists import PackListQueries


router = APIRouter()

@router.post('/api/packlist')
def create_pack_list(
    pack_list: PackListIn,
    account: dict = Depends(authenticator.get_current_account_data),
    repo: PackListQueries = Depends()
):
    user_id = account['id']
    new_list = repo.create(pack_list, user_id)
    return new_list
