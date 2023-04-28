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
Completed all the routers and queries. Moved on to integrating the third party weather api which gets the weather by the latitude and the longitude provided.
04/05/23
The request to get the weather was successful. We were discussing whether we should make another 3rd party api call to get the countries/states/cities but we agreed to just integrate their database with ours. We set up the queries for it using three for loops. One looping through country, then state then city. After calling the file in Docker, we were able to retrieve all of the country/state/city data. We were running into a problem where if the country didn't have a state, it wasn't populating the cities. So we just used a conditional statement to make sure we still got back cities even if there was no country data.
04/06/23
Started frontend authentication with redux. Used the galvanize frontend authentication lecture as a reference. Was not able to complete.
04/07/23
Continued frontend authentication and was successful. Only logged in users are able to accesss certain pages.

Week Three:
04/17/23
Created a nav bar Travel Threads logo which directs to the home page after clicked. We also set up a slice for our packing list page. It handles all the changes when filling out the create packing list form. Also created a createlist.jsx. Used the createDateList mutation so once filling out the form, it generated the relevant dates. Imported queries for get country, state, city.
04/18/23
Created a packing list page which is where users are redirected when logged in. If they don't have any lists, it displays "no packing lists" and
04/19/23
Created a packing list detail page which returns all the items added for all the dates, the quantity and if it has been packed or not. Created a query for get items by packing list and get one list query which upon clicking on the packing list, it takes us to the packing list detail page.
04/20/23
Worked on some bugs like provide tags, invalidate tags werent functioning. Refactored some code on the backend to make it functional on front end.

Week Four:
04/24/23
Using bootstrap for front-end design. Started off making redirects from login, signup pages. Continued working on the design for the main page. Researching how to create a login modal with redux.
04/25/23
Created a reducer for modal, saved it in store. Used bootstrap for the login page and wrapped it in isOpen. We were not successful.
04/26/23
Working on creating a dropdowwn nav bar. Created a dropdown reducer and in the nav.jsx, we've imported useDispatch, useSelector to get the state. The button is however unresponsive.
04/27/23
Switched to using react bootstrap. Integrated the navbar bootstrap with the nav.jsx file. Dropdown is now responsive. Git rid of a console error when clicking dropdown. Also used react bootstrap to create the login signup modal. Registered it in the store for global usage. The modals are now responsive. Was running into an error where the signup modal was rendering to the login. I changed it so the fields for login and signup have different names.
04/28/23
Working on the Data Models readme.md. Running through everything to make sure there are no errors in the console.
