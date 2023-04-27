from fastapi import APIRouter, Depends
from queries.weather import WeatherQueries
from models import WeatherOut

router = APIRouter()


@router.get("/api/weather/{latitude}/{longitude}", response_model=WeatherOut)
def get_weather(
    latitude: float, longitude: float, repo: WeatherQueries = Depends()
):
    return repo.get_weather(latitude, longitude)
