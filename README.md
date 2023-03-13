# Booking Slot Manager


Steps:
1. Using npm init -y cmd initialize the Node.js project with a default package.json file
2. Installing other npm pakages like express, mysql, nodemon
3. Than creating the MVC arch for code readability
4. Creating the index.js file and set up the express server 
5. Set up the MySQL db connection
6. Open the cmd prompt, log in to Your MySQl Db, Than create a db, select that db and create a table 
7. In controller file the the main logic
8. In routes file importing the controller and creating seperate route for that api
9. Than importing that routes file to index.js file to use as middleware

End Points: http://localhost:3000/slot

Tech Stack: 

[

    Node Js,
    Express Js,
    MySQL

]

Request Body JSON:

{

      "date": "2023/03/02",

      "startSlotTime": "15:30",

      "endSlotTime": "15:40"

}


Success Response:

{

    "status": true,
    "message": "Slot Booked Successfully"

}

Error Response:


{

    "status": false,
    "error": "This Slot is already Booked, Try another Slot"

}