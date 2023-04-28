# APIs

## Packing Lists

- **Method**: `POST`, `GET`, `GET`, `PUT`, `DELETE`,
- **Path**: `/api/packlist`, `/api/packlist/{id}`

Input:

```json
{
    "name": string,
    "start_date": date,
    "end_date": date,
    "country": string,
    "state": string,
    "city": string
}
```
Output:

```json
{
    "name": string,
    "start_date": date,
    "end_date": date,
    "country": string,
    "state": string,
    "city": string,
    "id": int,
    "user_id": int
}
```

Creating a new packing list saves the name, start_date, end_date, country, state, city, id, and user_id. This adds a new packing list to the database of which can you can add new items to.

## Account

-**Method**: `GET`, `POST`
-**Path**: `/api/accounts`

Input:

```json
{
    "email": string,
    "password": string
}
```

Output:

```json
{
    "id": int,
    "email": string
}
```
Creating a new account saves the email, password, and the id of the account. This allows you to log into the website and create your own packing lists.

## Date List
-**Method**: `POST`, `GET`, `GET`, `PUT`
-**Path**: `/api/packlist/{packing_list_id}/datelist/start/{start_date}/end/{end_date}`, `/api/packlist/{packing_list_id}/datelist`, `"/api/packlist/{packing_list_id}/datelist/{date_list_id}`

Input:

```json
{
    "date": string,
    "description": string
}
```

Output:

```json
{
    "date": string,
    "description": string,
    "id": int,
    "packing_list_id": int
}
```
Creating a new datelist saves the date, description, id, and packing_list_id. Datelist is a container inside of packing lists that allows the user to associate items with dates.

## Items
-**Method**: `POST`, `GET`, `GET`, `GET`, `PUT`, `DELETE`
-**Path**: `/api/packlist/items`, `/api/packlist/{packing_list_id}/datelist/{date_list_id}/items`, `/api/packlist/{packing_list_id}/items`, `/api/items/{items_id}`, `/api/packlist/items/{items_id}`

Input:

```json
{
    "name": string,
    "quantity": int,
    "is_packed": bool,
    "packing_list_id": int,
    "date_list_id": int
}
```

Output:

```json
{
    "name": string,
    "quantity": int,
    "is_packed": bool,
    "packing_list_id": int,
    "date_list_id": int,
    "id": int
}
```
Creating a new item saves the name, quantity, whether or not it is packed, packing_list_id, and date_list_id. Creating a new item allows a user to add an item to a packing list.


