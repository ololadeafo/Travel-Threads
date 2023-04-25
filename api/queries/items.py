from models import ItemsIn, ItemsOut
from queries.pool import pool
from typing import Union, List, Optional
from models import Error


class ItemsQueries:
    def create(self, user_id: int, items: ItemsIn) -> Union[ItemsOut, Error]:
        try:
            if hasattr(items, "date_list_id"):
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        result = db.execute(
                            """
                            INSERT INTO items
                                (name, quantity, is_packed, packing_list_id, date_list_id, user_id)
                            VALUES
                                (%s, %s, %s, %s, %s, %s)
                            RETURNING id;
                            """,
                            [
                                items.name,
                                items.quantity,
                                items.is_packed,
                                items.packing_list_id,
                                items.date_list_id,
                                user_id
                            ]
                        )
                        id = result.fetchone()[0]
                        return self.items_in_to_out(id, items)
            else:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        result = db.execute(
                            """
                            INSERT INTO items
                                (name, quantity, is_packed, packing_list_id, user_id)
                            VALUES
                                (%s, %s, %s, %s, %s, %s)
                            RETURNING id;
                            """,
                            [
                                items.name,
                                items.quantity,
                                items.is_packed,
                                items.packing_list_id,
                                user_id
                            ]
                        )
                        id = result.fetchone()[0]
                        return self.items_in_to_out(id, items)
        except Exception:
            return {"message": "Could not create items list"}


    def get_all(self, packing_list_id: int, date_list_id: int, user_id: int) -> Union[Error, List[ItemsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT (id, name, quantity, is_packed, packing_list_id, date_list_id)
                        FROM items
                        WHERE (packing_list_id = %s AND date_list_id = %s AND user_id = %s)
                        ORDER BY name;
                        """, [packing_list_id, date_list_id, user_id]
                    )
                    return[self.record_to_items_out(record[0]) for record in result]
        except Exception as e:
            return {"message": "Could not get all items"}


    def get_all_by_packlist(self, packing_list_id: int, user_id: int) -> Union[Error, List[ItemsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT (id, name, quantity, is_packed, packing_list_id, date_list_id)
                        FROM items
                        WHERE (packing_list_id = %s AND user_id = %s)
                        ORDER BY id;
                        """, [packing_list_id, user_id]
                    )
                    return[self.record_to_items_out(record[0]) for record in result]
        except Exception as e:
            return {"message": "Could not get all items"}


    def get_one(self, items_id: int, user_id: int) -> Optional[ItemsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT (id, name, quantity, is_packed, packing_list_id, date_list_id)
                        FROM items
                        WHERE (id=%s AND user_id=%s)
                        ORDER BY name;
                        """, [items_id, user_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_items_out(record[0])
        except Exception as e:
            return {"message": "Could not get that item"}

    def update(self, items_id: int, user_id: int, items: ItemsIn) -> Union[ItemsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE items
                        SET name=%s, quantity=%s, is_packed=%s
                        WHERE (id=%s AND user_id=%s)
                        """,
                        [
                            items.name,
                            items.quantity,
                            items.is_packed,
                            items_id,
                            user_id
                        ]
                    )
                    print("Items after function:", self.items_in_to_out(items_id, items))
                    return self.items_in_to_out(items_id, items)
        except Exception:
            return {"message": "Could not update the item list"}

    def delete(self, user_id: int, items_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM items
                        WHERE (user_id=%s AND id=%s)
                        """,
                        [user_id, items_id]
                    )
                    return True
        except Exception as e:
            return False

    def items_in_to_out(self, id: int, items: ItemsIn):
        old_data = items.dict()
        return ItemsOut(id=id, **old_data)

    def record_to_items_out(self, record):
        return ItemsOut(
            id = record[0],
            name = record[1],
            quantity = record[2],
            is_packed = record[3],
            packing_list_id = record[4],
            date_list_id = record[5]
        )
