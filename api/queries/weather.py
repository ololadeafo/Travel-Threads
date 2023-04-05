import requests

class WeatherQueries:
    base_url = 'https://api.open-meteo.com/v1/forecast?'
    def get_weather(self, latitude:float, longitude:float):
        res = requests.get(self.base_url + f'latitude={latitude}&longitude={longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_probability_max,windspeed_10m_max&temperature_unit=fahrenheit&forecast_days=16&timezone=auto')

        return res.json()
