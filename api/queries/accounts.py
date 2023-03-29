# from bson.objectid import ObjectId
# from queries.client import Queries
from models import AccountIn, AccountOutWithHashedPassword
from queries.pool import pool

class DuplicateAccountError(ValueError):
    pass

class AccountQueries:
    def create(self, info: AccountIn, hashed_password: str):
        account = info.dict()
        del account['password']
        account['hashed_password'] = hashed_password
        # if self.get(account['email']) is not None:
        #     raise DuplicateAccountError
        try:
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
                    return AccountOutWithHashedPassword(**account)
        except Exception:
            return {"message": "Couldn't create user"}

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
        val = result.fetchone()
        if not val:
            return None
        account = list(val)
        print(account)
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
