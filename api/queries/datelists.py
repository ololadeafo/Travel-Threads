from models import DateListIn, DateListOut
from queries.pool import pool
from typing import Union, List, Optional
from models import Error

class DateListQueries:
    def create(self, user_id: int, packing_list_id: int, date_list: DateListIn) -> Union[DateListOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    user_confirm = db.execute(
                        """
                        SELECT user_id
                        FROM packing_list
                        WHERE (id = %s)
                        """, [packing_list_id]
                    )
                    confirmed_id = user_confirm.fetchone()
                    if confirmed_id[0] != user_id:
                        return {"message": "Invalid packing list id"}
                    else:
                        result = db.execute(
                            """
                            INSERT INTO date_list
                                (user_id, date, description, packing_list_id)
                            VALUES
                                (%s, %s, %s, %s)
                            RETURNING id;
                            """,
                            [
                                user_id,
                                date_list.date,
                                date_list.description,
                                packing_list_id
                            ]
                        )
                        id = result.fetchone()[0]
                        return self.date_list_in_to_out(id, date_list)
        except Exception:
            return {"message": "Could not create packing list associated with this date"}

    def get_all(self, user_id: int, packing_list_id: int) -> Union[Error, List[DateListOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT (id, date, description, packing_list_id, user_id)
                        FROM date_list
                        WHERE (user_id = %s AND packing_list_id = %s)
                        ORDER BY date;
                        """, [user_id, packing_list_id]
                    )

                    return[self.record_to_date_list_out(record[0]) for record in result]
        except Exception as e:
            print(e)
            return {"message" : "Could not get all date lists"}

    def get_one(self, date_list_id:int, user_id: int, packing_list_id: int) -> Optional[DateListOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT (id, date, description, packing_list_id, user_id)
                        FROM date_list
                        WHERE (id=%s AND user_id = %s AND packing_list_id = %s)
                        ORDER BY date;
                        """, [date_list_id, user_id, packing_list_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_date_list_out(record[0])
        except Exception as e:
            print(e)
            return {"message": "Could not get that date list"}

    def update(self, packing_list_id: int, date_list_id:int, user_id:int, date_list: DateListIn) -> Union[DateListOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE date_list
                        SET date = %s,  description = %s
                        WHERE (id = %s AND user_id = %s AND packing_list_id = %s)
                        """,
                        [
                        date_list.date,
                        date_list.description,
                        date_list_id,
                        user_id,
                        packing_list_id
                        ]
                    )

                    return self.date_list_in_to_out(date_list_id, date_list)
        except Exception:
            return {"message": "Could not update that date list"}

    def date_list_in_to_out(self, id: int, date_list: DateListIn):
        old_data = date_list.dict()
        return DateListOut(id=id, packing_list_id=id, date_list_id=id, **old_data)

    def record_to_date_list_out(self, record):
        return DateListOut(
            id = record[0],
            date = record[1],
            description = record[2],
            packing_list_id = record[3],
        )
