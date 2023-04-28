# Data Models

API
======


## Packing List

| name | type | unique | optional |
| --------------- | --------------- | --------------- |---------------|
| user_id | reference to users entity | yes |no |
| name | str | no |no |
| start_date | date | no |no |
| end_date | date | no |no |
| country | str | no |no |
| state | str | no |yes |
| city | str | no |yes |

##### The `packing list` entity contains the data related to a user's packing list for a trip.


## Date List

| name | type | unique | optional |
| --------------- | --------------- | --------------- |---------------|
| date | date | no |no |
| description | str | no |yes |
| packing_list_id | reference to packing list entity | no |no |
| user_id | reference to users entity | no |no |

##### The `date list` entity represents a list of dates that are associated with a specific packing list and user.

## Items

| name | type | unique | optional |
| --------------- | --------------- | --------------- |---------------|
| name | str | no |no |
| quantity | smallint | no |no |
| is_packed | boolean | no |no |
| packing_list_id | reference to packing list entity | no |no |
| date_list_id | reference to date list entity | no |yes |
| user_id | reference to users entity | no |no |

##### The `items` entity represents the individual items that a user plans to bring on their trip.

## Countries

| name | type | unique | optional |
| --------------- | --------------- | --------------- |---------------|
| name | str | no |no |
| iso3 | str | no |no |
| latitude | numeric | no |no |
| longitude | numeric | no |no |

##### The `countries` entity provides users with data on various countries, including their geographic location and ISO code.

## States

| name | type | unique | optional |
| --------------- | --------------- | --------------- |---------------|
| name | str | no |no |
| country_id | reference to countries entity | no |no |
| latitude | numeric | no |no |
| longitude | numeric | no |no |

##### The `states` entity provides users with data on various states or provinces within a country, including their geographic location.

## Cities

| name | type | unique | optional |
| --------------- | --------------- | --------------- |---------------|
| name | str | no |no |
| latitude | numeric | no |no |
| longitude | numeric | no |no |
| country_id | reference to countries entity | no |no |
| state_id | reference to states entity | no |no |

##### The `cities` entity provides users with data on various cities, including their geographic location and which country and state they belong to.
