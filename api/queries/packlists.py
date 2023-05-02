from models import PackListIn, PacklistOut
from queries.pool import pool
from typing import Union, List, Optional
from models import Error


class PackListQueries:
    def create(
        self, pack_list: PackListIn, user_id
    ) -> Union[PacklistOut, Error]:
        try:
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
                            pack_list.city,
                        ],
                    )

                    id = result.fetchone()[0]
                    return self.pack_list_in_to_out(id, user_id, pack_list)
        except Exception as e:
            return {"message": "Could not create packing list", "Error": e}

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
                        """,
                        [user_id],
                    )

                    return [
                        self.record_to_pack_list_out(record[0])
                        for record in result
                    ]
        except Exception as e:
            return {"message": "Could not get all packing lists", "Error": e}

    def get_one(self, id: int, user_id: int) -> Optional[PacklistOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT (id, user_id, name, start_date, end_date, country, state, city)
                        FROM packing_list
                        WHERE (user_id = %s AND id = %s)
                        ORDER BY start_date;
                        """,
                        [user_id, id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_pack_list_out(record[0])
        except Exception as e:
            return {"message": "Could not get that packing list", "Error": e}

    def update(
        self, id: int, user_id: int, pack_list: PackListIn
    ) -> Union[PacklistOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE packing_list
                        SET name = %s
                        , start_date = %s
                        , end_date = %s
                        , country = %s
                        , state = %s
                        , city = %s
                        WHERE (user_id = %s AND id = %s)
                        """,
                        [
                            pack_list.name,
                            pack_list.start_date,
                            pack_list.end_date,
                            pack_list.country,
                            pack_list.state,
                            pack_list.city,
                            user_id,
                            id,
                        ],
                    )
                    return self.pack_list_in_to_out(id, user_id, pack_list)
        except Exception as e:
            return {"message": "Could not update that packing list", "Error": e}

    def delete(self, user_id: int, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM packing_list
                        WHERE (user_id = %s AND id = %s)
                        """,
                        [user_id, id],
                    )
                    return True
        except Exception:
            return False

    def pack_list_in_to_out(
        self, id: int, user_id: int, pack_list: PackListIn
    ):
        old_data = pack_list.dict()
        return PacklistOut(id=id, user_id=user_id, **old_data)

    def record_to_pack_list_out(self, record):
        return PacklistOut(
            id=record[0],
            user_id=record[1],
            name=record[2],
            start_date=record[3],
            end_date=record[4],
            country=record[5],
            state=record[6],
            city=record[7],
        )
