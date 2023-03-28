# from bson.objectid import ObjectId
# from queries.client import Queries
from models import AccountIn, AccountOutWithHashedPassword
from queries.pool import pool

class DuplicateAccountError(ValueError):
    pass

class AccountQueries:
    def create(self, info: AccountIn, hashed_password: str):
        print(info)
        account = info.dict()
        print(account)
        del account['password']
        account['hashed_password'] = hashed_password
        print(account)
        # if self.get(account['email']) is not None:
        #     raise DuplicateAccountError
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (email, hashed_password)
                    VALUES
                    (%s, %s)
                    RETURNING id;
                    """,
                    [account['email'], account['hashed_password']]
                )
                id = result.fetchone()[0]
                account['id'] = str(id)
                print(account)
                return AccountOutWithHashedPassword(**account)

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
                result['id'] = resu

    # def get(self, username: str):
    #     result = self.collection.find_one({"username": username.lower()})
    #     if result is None:
    #         return None
    #     result['id'] = str(result['_id'])
    #     return AccountOutWithHashedPassword(**result)
