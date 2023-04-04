Week One
03/27/23
Set up Progresql, updated Docker.yaml file, requirements.txt and Dockerfile.dev. Created tables for the database and made migrations.
03/28/23
Working on authentication. Running into trouble writing queries for account.
03/29/23
Finished up authentication and models. Wrote the routers and queries for the packing list. Set it up so only the authenticated user can post/get/put/delete a packing list.
03/30/23
Routers and queries for packing list done. Made changes to the migration files. Moving onto writing routers/querie for date list.

Week Two
04/03/23
CRUD and routers for date list is done. Will be making changes date list tomorrow. Specifically, the users will not be able to get one/delete/create a date list. The dates listed will be created by the users through the packing list. They will also not be able to update the date or change the id of the packing list. For the create, we'll include a packing list id in the endpoint, so users will not be able to update the id. Finish up writing queries/routers for the last table (items). Move onto incorporating 3rd party apis to our backend.
04/04/23
04/05/23
04/06/23
04/07/23
