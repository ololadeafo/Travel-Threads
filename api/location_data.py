import requests
from queries.pool import pool

def add_locations():
    url = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json'
    res = requests.get(url)
    data = res.json()
    for country in data:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO countries
                        (name, iso3)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                    [
                        country["name"],
                        country["iso3"]
                    ]
                )
                id = result.fetchone()[0]
        for state in country["states"]:
            if len(state["cities"]) == 1 :
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        db.execute(
                            """
                            INSERT INTO cities
                                (name, latitude, longitude, country_id)
                            VALUES
                                (%s, %s, %s, %s)
                            """,
                            [
                                state["cities"][0]["name"],
                                state["cities"][0]["latitude"],
                                state["cities"][0]["longitude"],
                                id
                            ]
                        )
            else:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        result = db.execute(
                            """
                            INSERT INTO states
                                (name, country_id)
                            VALUES
                                (%s, %s)
                            RETURNING id;
                            """,
                            [
                                state["name"],
                                id
                            ]
                        )
                        state_id = result.fetchone()[0]
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
                                    state_id
                                ]
                            )


add_locations()
