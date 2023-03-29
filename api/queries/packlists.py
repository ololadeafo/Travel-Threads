
from models import PackListIn, PacklistOut
from queries.pool import pool


class PackListQueries:
    def create(self, pack_list: PackListIn, user_id) -> PacklistOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO packing_list
                        (user_id, name, start_date, end_date, country, state, city)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        user_id,
                        pack_list.name,
                        pack_list.start_date,
                        pack_list.end_date,
                        pack_list.country,
                        pack_list.state,
                        pack_list.city
                    ]
                )
                id = result.fetchone()[0]
                old_data = pack_list.dict()
                return PacklistOut(id=id, user_id=user_id, **old_data)
