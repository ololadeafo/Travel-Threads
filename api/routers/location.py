from fastapi import APIRouter, Depends, Response
from models import CountriesOut, StatesOut, CitiesOut, CityOutWithAllInfo
from authenticator import authenticator
from queries.location import LocationQueries
from typing import List, Union, Optional
from models import Error


router = APIRouter()

@router.get('/api/location/countries', response_model=List[CountriesOut])
def get_all_countries(repo: LocationQueries = Depends()):
    countries = repo.get_countries()
    return countries


@router.get('/api/location/{country_id}/states', response_model = List[StatesOut])
def get_states_by_country(
    country_id: int,
    repo: LocationQueries = Depends()
):
    states = repo.get_states(country_id)
    return states


@router.get('/api/location/{province_type}/{province_id}/cities', response_model = List[CitiesOut])
def get_cities(
    province_type: str,
    province_id: int | None,
    repo: LocationQueries = Depends()
):
    cities = repo.get_cities(province_type, province_id)
    return cities


@router.get('/api/location/city/{city_id}')
def get_city_info(
    city_id: int,
    repo: LocationQueries = Depends()
):
    city = repo.get_one_city(city_id)
    return city


@router.get('/api/location/city/details/{city_id}')
def get_all_city_info(
    city_id: int,
    repo: LocationQueries = Depends()
):
    city = repo.get_all_city_info(city_id)
    return city
