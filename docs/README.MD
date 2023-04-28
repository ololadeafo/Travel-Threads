# Travel Threads

---

*Hayden Dunlap
*Kyle McGinley
*Lola Afolabi
*Nina Kapanadze
\*Ross Appelbaum

---

Travel Threads- Have you ever been planning a vacation and forgotten what to pack? Well travel threads is here to save the day!

Travel Threads- Catch flights not feelings.

Travel Threads: Pack Smart, Weather-Wise, Adventure-ready!

# Design

---

# Intended Market

---

Our target consumer is anyone in need of an app to organize and keep track of their packing lists. With an easy to use interface, consumers of all ages will be able to use and enjoy the app.

# Functionality

---

*Visitors will be directed to the home page welcoming them to Travel Threads.
*There are login/signup options in the nav bar if the user is logged out
*There will be navlinks to packing lists page, create packing list, and log out action in the nav bar if the user is logged in.
*There will be a "Get Packin!" call to action.
*If the user is logged out, the "Get Packin!" button will direct the visitor to the login page
*If the user is logged in, the "Get Packin!" button will direct the visitor to the list of packing lists page
*The user will be able to see a list of all packing lists associated with their account.
*Each packing list will be displayed on a card with the name of the event, date range of the event, and the location of the event.
*Users can delete a packing list from using the "delete" button on the card
*There will be a "Add a Packing List" button above the list of packing lists to create a new packing list.
*Users will be able to create a packing list
*Submission will redirect the user to the list of packing lists page
*Users will be able to view a detail page for the packing list by clicking on the card
*Page will display all items associated with the packing list to check off
*Will display the weather data on cards for each day.
*Users will be able to view a detailed date page. Each date within the packing list date range will have a description, weather data, and items
\*A user can add/edit/delete items for each date.
\*A user can edit the description

---

# Project Initialization

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run docker volume create fastapi-travel-threads-data
4. Run docker-compose build
5. Run docker-compose up
6. Run docker exec -it travel-threads-fastapi-1 bash
7. Run python location_data.py (File is finished running when the number hits 250)
8. Exit the container's command line
