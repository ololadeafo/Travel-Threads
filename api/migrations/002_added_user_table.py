steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            email VARCHAR(100) NOT NULL,
            hashed_password VARCHAR(300) NOT NULL
        );
        """,

        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
]
