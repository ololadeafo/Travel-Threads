from models import (
    CountriesOut,
    StatesOut,
    CitiesOut,
    CityOut,
    CityOutWithAllInfo,
    StateOutWithAllInfo,
    CountryOutWithAllInfo,
)
from queries.pool import pool
from typing import List
from location_data import add_locations


class LocationQueries:
    def get_countries(self) -> List[CountriesOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, name, iso3
                    FROM countries
                    ORDER BY name;
                    """
                )
                records = result.fetchall()
                if records == []:
                    add_locations()
                return [
                    self.record_to_countries_out(record) for record in records
                ]

    def get_states(self, country_id: int) -> List[StatesOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, name
                    FROM states
                    WHERE country_id = %s
                    ORDER BY name;
                    """,
                    [country_id],
                )
                records = result.fetchall()

                return [
                    self.record_to_states_out(record) for record in records
                ]

    def get_cities(
        self, province_type: str, province_id=None
    ) -> List[StatesOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                if province_type == "country":
                    result = db.execute(
                        """
                        SELECT id, name
                        FROM cities
                        WHERE country_id = %s
                        ORDER BY name;
                        """,
                        [province_id],
                    )
                    records = result.fetchall()
                else:
                    result = db.execute(
                        """
                        SELECT id, name
                        FROM cities
                        WHERE state_id = %s
                        ORDER BY name;
                        """,
                        [province_id],
                    )
                    records = result.fetchall()

                return [
                    self.record_to_cities_out(record) for record in records
                ]

    def get_one_city(self, city_id) -> CitiesOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, name, longitude, latitude
                    FROM cities
                    WHERE id = %s
                    ORDER BY name;
                    """,
                    [city_id],
                )
                record = result.fetchone()

                return self.record_to_city_out(record)

    def get_all_city_info(self, city_id) -> CityOutWithAllInfo:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT ci.id AS id, ci.name AS name, s.name AS state, co.name AS country
                    FROM cities AS ci
                    LEFT OUTER JOIN states s
                        ON (ci.state_id = s.id)
                    LEFT OUTER JOIN countries co
                        ON (ci.country_id = co.id)
                    WHERE ci.id = %s
                    ORDER BY name;
                    """,
                    [city_id],
                )
                record = result.fetchone()
                return CityOutWithAllInfo(
                    id=city_id,
                    name=record[1],
                    state=record[2],
                    country=record[3],
                )

    def get_all_state_info(self, state_id) -> StateOutWithAllInfo:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT s.name AS state, s.id AS state_id, co.name AS country, s.latitude AS latitude, s.longitude AS longitude
                    FROM states AS s
                    LEFT OUTER JOIN countries co
                        ON (s.country_id = co.id)
                    WHERE s.id = %s
                    """,
                    [state_id],
                )
                record = result.fetchone()
                return StateOutWithAllInfo(
                    id=state_id,
                    name=record[0],
                    country=record[2],
                    latitude=record[3],
                    longitude=record[4],
                )

    def get_all_country_info(self, country_id) -> CountryOutWithAllInfo:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT c.id AS id, c.name AS name, c.latitude AS latitude, c.longitude AS longitude
                    FROM countries AS c
                    WHERE c.id = %s
                    """,
                    [country_id],
                )
                record = result.fetchone()
                return CountryOutWithAllInfo(
                    id=country_id,
                    name=record[1],
                    latitude=record[2],
                    longitude=record[3],
                )

    def record_to_countries_out(self, record):
        return CountriesOut(id=record[0], name=record[1], iso3=record[2])

    def record_to_states_out(self, record):
        return StatesOut(id=record[0], name=record[1])

    def record_to_cities_out(self, record):
        return CitiesOut(id=record[0], name=record[1])

    def record_to_city_out(self, record):
        return CityOut(
            id=record[0],
            name=record[1],
            longitude=record[2],
            latitude=record[3],
        )
