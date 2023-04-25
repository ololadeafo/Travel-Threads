from models import CountriesOut, StatesOut, CitiesOut, CityOut, CityOutWithAllInfo
from queries.pool import pool
from typing import Union, List, Optional
from models import Error


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

                return [self.record_to_countries_out(record) for record in records]

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
                    [country_id]
                )
                records = result.fetchall()

                return [self.record_to_states_out(record) for record in records]

    def get_cities(self, province_type: str, province_id=None) -> List[StatesOut]:
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
                        [province_id]
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
                        [province_id]
                    )
                    records = result.fetchall()
                    print(records)

                return [self.record_to_cities_out(record) for record in records]

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
                    [city_id]
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
                    [city_id]
                )
                record = result.fetchone()
                return CityOutWithAllInfo(
                    id = city_id,
                    name = record[1],
                    state = record[2],
                    country = record[3]
                )


    def record_to_countries_out(self, record):
        return CountriesOut(
            id = record[0],
            name = record[1],
            iso3 = record[2]
        )

    def record_to_states_out(self, record):
        return StatesOut(
            id = record[0],
            name = record[1]
        )

    def record_to_cities_out(self, record):
        return CitiesOut(
            id = record[0],
            name = record[1]
        )

    def record_to_city_out(self, record):
        return CityOut(
            id = record[0],
            name = record[1],
            longitude = record[2],
            latitude = record[3]
        )
