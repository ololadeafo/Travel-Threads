import requests
from queries.pool import pool


def add_locations():
    url = (
        "https://raw.githubusercontent.com/dr5hn" \
            +"/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
        )
    res = requests.get(url)
    data = res.json()
    for country in data:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO countries
                        (name, iso3, latitude, longitude)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        country["name"],
                        country["iso3"],
                        country["latitude"],
                        country["longitude"],
                    ],
                )
                id = result.fetchone()[0]
                print(id)
        if len(country["states"]) > 0:
            for state in country["states"]:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        result = db.execute(
                            """
                            INSERT INTO states
                                (name, latitude, longitude, country_id)
                            VALUES
                                (%s, %s, %s, %s)
                            RETURNING id;
                            """,
                            [
                                state["name"],
                                state["latitude"],
                                state["longitude"],
                                id,
                            ],
                        )
                        state_id = result.fetchone()[0]
                if len(state["cities"]) > 0:
                    for city in state["cities"]:
                        with pool.connection() as conn:
                            with conn.cursor() as db:
                                result = db.execute(
                                    """
                                    INSERT INTO cities
                                        (name, latitude, longitude, country_id, state_id)
                                    VALUES
                                        (%s, %s, %s, %s, %s)
                                    """,
                                    [
                                        city["name"],
                                        city["latitude"],
                                        city["longitude"],
                                        id,
                                        state_id,
                                    ],
                                )


add_locations()
