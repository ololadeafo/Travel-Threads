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
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE packing_list (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL,
            CONSTRAINT fk_user_id
                FOREIGN KEY(user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE,
            name VARCHAR(100) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            country VARCHAR(200) NOT NULL,
            state VARCHAR(200) NULL,
            city VARCHAR(200) NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE packing_list;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE date_list (
            id SERIAL PRIMARY KEY NOT NULL,
            date DATE NOT NULL,
            description VARCHAR(300) NULL,
            packing_list_id INTEGER NOT NULL,
            CONSTRAINT fk_packing_list_id
                FOREIGN KEY(packing_list_id)
                    REFERENCES packing_list(id)
                    ON DELETE CASCADE,
            user_id INTEGER NOT NULL,
            CONSTRAINT fk_user_id
                FOREIGN KEY(user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE date_list;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE items (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            quantity SMALLINT NOT NULL,
            is_packed BOOLEAN NOT NULL,
            packing_list_id INTEGER NOT NULL,
            CONSTRAINT fk_packing_list_id
                FOREIGN KEY(packing_list_id)
                    REFERENCES packing_list(id)
                    ON DELETE CASCADE,
            date_list_id INTEGER NULL,
            CONSTRAINT fk_date_list_id
                FOREIGN KEY(date_list_id)
                    REFERENCES date_list(id)
                    ON DELETE CASCADE,
            user_id INTEGER NOT NULL,
            CONSTRAINT fk_user_id
                FOREIGN KEY(user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE items;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE countries (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            iso3 VARCHAR(3) NOT NULL,
            latitude NUMERIC NOT NULL,
            longitude NUMERIC NOT NULL

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE countries;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE states (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            country_id INTEGER NOT NULL,
            latitude NUMERIC,
            longitude NUMERIC,
            CONSTRAINT fk_country_id
                FOREIGN KEY(country_id)
                    REFERENCES countries(id)
                    ON DELETE CASCADE

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE states;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE cities (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            latitude NUMERIC NOT NULL,
            longitude NUMERIC NOT NULL,
            country_id INTEGER,
            CONSTRAINT fk_country_id
                FOREIGN KEY(country_id)
                    REFERENCES countries(id)
                    ON DELETE CASCADE,
            state_id INTEGER,
            CONSTRAINT fk_state_id
                FOREIGN KEY(state_id)
                    REFERENCES states(id)
                    ON DELETE CASCADE

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE cities;
        """,
    ],
]
