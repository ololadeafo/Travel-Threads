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

    # [
    #     # "Up" SQL statement
    #     """
    #     CREATE TABLE packing_list (
    #         id SERIAL PRIMARY KEY NOT NULL,
    #         user_id INTEGER REFERENCES users(id),
    #         name VARCHAR(100) NOT NULL,
    #         start_date DATE NOT NULL,
    #         end_date DATE NOT NULL,
    #         country VARCHAR(200) NOT NULL,
    #         state VARCHAR(200) NULL,
    #         city VARCHAR(200) NOT NULL
    #     );
    #     """,

    #     # "Down" SQL statement
    #     """
    #     DROP TABLE packing_list;
    #     """
    # ],

    # [
    #     # "Up" SQL statement
    #     """
    #     CREATE TABLE date_list (
    #         id SERIAL PRIMARY KEY NOT NULL,
    #         date DATE NOT NULL,
    #         description VARCHAR(300) NULL,
    #         packing_list_id INTEGER REFERENCES packing_list(id)
    #     );
    #     """,
    #     # "Down" SQL statement
    #     """
    #     DROP TABLE date_list;
    #     """
    # ],

    # [
    #     # "Up" SQL statement
    #     """
    #     CREATE TABLE misc_list (
    #         id SERIAL PRIMARY KEY NOT NULL,
    #         packing_list_id INTEGER REFERENCES packing_list(id)
    #     );
    #     """,
    #     # "Down" SQL statement
    #     """
    #     DROP TABLE misc_list;
    #     """
    # ],


    # [
    #     # "Up" SQL statement
    #     """
    #     CREATE TABLE items (
    #         id SERIAL PRIMARY KEY NOT NULL,
    #         name VARCHAR(100) NOT NULL,
    #         quantity SMALLINT NOT NULL,
    #         is_packed BOOLEAN NOT NULL,
    #         date_list_id INTEGER REFERENCES date_list(id)

    #     );
    #     """,
    #     # "Down" SQL statement
    #     """
    #     DROP TABLE items;
    #     """
    # ]
]
