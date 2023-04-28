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

## Location
--**Method**: `GET`, `GET`, `GET`, `GET`, `GET`, `GET`, `GET`
--**Path**: `/api/location/countries`, `/api/location/{country_id}/states`,  `/api/location/{province_type}/{province_id}/cities`, `/api/location/city/{city_id}`,`/api/location/city/details/{city_id}`, `/api/location/state/details/{state_id}`, `/api/location/country/details/{country_id}`,

Output:

Countries Out
```json
{
    "id": int,
    "name": string,
    "iso3": string
}
```
States Out
```json
{
    "id": int,
    "name": string,
}
```
Cities Out
```json
{
    "id": int,
    "name": string
}
```
City Out
```json
{
    "id": int,
    "name": string,
    "longitude": float,
    "latitude": float
}
```
City Out With All Info
```json
{
    "id": int,
    "name": string,
    "state": string,
    "country": string
}
```
State Out with All Info
```json
{
    "id": int,
    "name": string,
    "country": string,
    "latitude": float,
    "longitude": float
}
```
Country Out with All Info
```json
{
    "id": int,
    "name": string,
    "latitude": float,
    "longitude": float
}
```

The location data is all stored in our database, not an API call that we make so this endpoint is essentially all gets. When a country is selected, the states of the country populate and when a state is selected the cities belonging to that state populates, it will then give you the name, longitude, and latitude of that city. This works with small countries like monaco and the vatican city as well just by choosing the country, it will still give a longitude and latitude. The same goes with states of a country that have no cities.


## Weather
--**Method**: `GET`
--**Path**: `/api/weather/{latitude}/{longitude}`

Output:

```json
{
    "daily": object
}
```
This our API call to a weather API, it takes a longitude and latitude when a user enters a location and gives the daily weather back in an object. This allows us to populate the front end with weather information.
