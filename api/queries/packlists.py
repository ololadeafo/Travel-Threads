
from models import PackListIn, PacklistOut
from queries.pool import pool
from typing import Union, List
from models import Error


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

    def get_all(self, user_id) -> Union[Error, List[PacklistOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT (id, user_id, name, start_date, end_date, country, state, city)
                        FROM packing_list
                        WHERE (user_id = %s)
                        ORDER BY start_date;
                        """, [user_id]
                    )
                    return [
                        self.record_to_pack_list_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all packing lists"}

    def record_to_pack_list_out(self, record):
        return PacklistOut(
            id =record[0],
            user_id=record[1],
            name=record[2],
            start_date=record[3],
            end_date=record[4],
            country=record[5],
            state=record[6],
            city=record[7],
        )
                        
        
