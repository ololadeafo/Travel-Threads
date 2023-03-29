# from bson.objectid import ObjectId
# from queries.client import Queries
import psycopg2
from psycopg2.extras import RealDictCursor
from models import AccountIn, AccountOutWithHashedPassword
from queries.pool import pool

class DuplicateAccountError(ValueError):
    pass

class AccountQueries:
    def create(self, info: AccountIn, hashed_password: str):
        info.username = info.username.lower()
        account = info.dict()
        del account['password']
        account['hashed_password'] = hashed_password
        if self.get(account['email']) is not None:
            raise DuplicateAccountError
        conn = psycopg2.connect(self.conn_string)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            """
            INSERT INTO users
                (email, hashed_password)
            VALUES
            (%s, %s)
            RETURNING id;
            """,
            (account["email"], account["hashed_password"])
        )
        result = cursor.fetchone()
        account_out = AccountOutWithHashedPassword(
        id=str(result['id']),
        email=result['email'],
        hashed_password=result['hashed_password']
        )

        cursor.close()
        conn.close()

        return account_out








        # account = info.dict()
        # del account['password']
        # account['hashed_password'] = hashed_password
        # if self.get(account['email']) is not None:
        #     raise DuplicateAccountError
        # with pool.connection() as conn:
        #     with conn.cursor() as db:
        #         result = db.execute(
        #             """
        #             INSERT INTO users
        #                 (email, hashed_password)
        #             VALUES
        #             (%s, %s)
        #             RETURNING id;
        #             """,
        #             [account['email'], account['hashed_password']]
        #         )
        #         id = result.fetchone()[0]
        #         account['id'] = str(id)
        #         print(account)
        #         return AccountOutWithHashedPassword(**account)

    #     info.username = info.username.lower()
    #     account = info.dict()
    #     del account['password']
    #     account['hashed_password'] = hashed_password
    #     if self.get(account['username']) is not None:
    #         raise DuplicateAccountError
    #     self.collection.insert_one(account)
    #     account['id'] = str(account['_id'])
    #     return AccountOutWithHashedPassword(**account)

    def get(self, email: str):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                """
                SELECT id, email, hashed_password
                FROM users
                WHERE email = %s
                """, [email]
                )





                if result.fetchall() == False:
                    return None

                account = list(result.fetchall()[0])

                account[0] = str(account[0])
                d = {}
                d['id'] = account[0]
                d['email'] = account[1]
                d['hashed_password'] = account[2]
                return AccountOutWithHashedPassword(**d)

    # def get(self, username: str):
    #     result = self.collection.find_one({"username": username.lower()})
    #     if result is None:
    #         return None
    #     result['id'] = str(result['_id'])
    #     return AccountOutWithHashedPassword(**result)
