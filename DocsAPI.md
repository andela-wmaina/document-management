# Docs API

Docs is a simple API that allows users to create documents and manage them

## User Collection [api/users]

### Get All Users [GET]

You can view all users. This is a GET request that returns all records in the
user table.

+ Response 201 (application/json)
        
        [
            {
                "id": 1,
                "username": "Peter",
                "email": "peter@tree.com",
                "password": "$2a$10$Jpu1xyNkTbTOOh58A0hPUedXcVsvkVveL93vvRVMh7wJ6UHo.VZlW",
                "createdAt": "2017-03-23T12:52:59.744Z",
                "updatedAt": "2017-03-23T12:52:59.744Z",
                "roleId": 1
            },
            
            {
                "id": 2,
                "username": "Birdie",
                "email": "birdie@tree.com",
                "password": "$2a$10$vorul1Tvy54QHiQcn.CU1O7V3MZrvnB8qE49RsjYqB9kzfpaAvGwy",
                "createdAt": "2017-03-23T12:52:59.744Z",
                "updatedAt": "2017-03-23T12:52:59.744Z",
                "roleId": 2
            },
            
            {
                "id": 3,
                "username": "Fox",
                "email": "fox@tree.com",
                "password": "$2a$10$Jpu1xyNkTbTOOh58A0hPUeKg88n1ReTfs05eD9Z8VdWPsOwG5s3BO",
                "createdAt": "2017-03-23T12:52:59.744Z",
                "updatedAt": "2017-03-23T12:52:59.744Z",
                "roleId": 2
            }
        ]

### Create a New User [POST]

You can register a user. This is a POST request that creates a new user
by accepting a JSON object that has the user's username, email and password
details.


+ Request (application/json)

        {
            "username": "Resh",
            "email": "resh@trial.com"
            "password": "reshy"
        }

+ Response 201 (application/json)

        {
            "message": "You have been successfully registered",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQsImlhdCI6MTQ5MDc3NTg4N30.wjPNx5bM5Kudimq6cjME91bllSP0AkUEp40Hx_TMYfM",
            "userDetails": {
                "id": 4,
                "username": "Resh",
                "email": "resh@trail.com",
                "password": "$2a$10$G47tWnTldAwGpKu7GRZqJeZxgROrqEWeiQSHhA9ruE.1vpjAaPXna",
                "roleId": 2,
                "updatedAt": "2017-03-29T08:24:46.296Z",
                "createdAt": "2017-03-29T08:24:46.296Z"
            }
        }

## User Collection [api/users/login]
            
### Logs in a User [PUT]

You can login a user. This is a POST request that logins in a user by
recieving a JSON object that contains the user's username and password.

+ Request (application/json)

        {
            "username": "Resh",
            "password": "reshy"
        }

+ Response 201 (application/json)

        {
            "message": "You have been successfully logged in",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQsImlhdCI6MTQ5MDc3NjE5OH0.7Cdsryv6whDtCazX3EAFPzfuo-Ou5ST7Mw2-lJJLM7s",
            "user": {
                "id": 4,
                "username": "Resh",
                "email": "resh@trail.com",
                "password": "$2a$10$G47tWnTldAwGpKu7GRZqJeZxgROrqEWeiQSHhA9ruE.1vpjAaPXna",
                "createdAt": "2017-03-29T08:24:46.296Z",
                "updatedAt": "2017-03-29T08:24:46.296Z",
                "roleId": 2
            }
        }

## User Collection [api/users/4]

### Updates a User [PUT]

You can update your user details. This is a PUT request that recieves a
JSON object containing the variable the user wants to change assigned to
the new value. It returns a success message.

+ Request (application/json)

        {
            "username": "Reshy"
        }

+ Response 200 (application/json)

        {
          "message": "Your changes have been successfully applied"
        }

### Get a User by id [GET]

You can find a user by their id. This is a GET request that takes in
a parameter (id) and finds a user that matches that id. It returns
the found user object.

+ Response 200 (application/json)

        {
            "id": 4,
            "username": "Reshy",
            "email": "resh@trail.com",
            "password": "$2a$10$G47tWnTldAwGpKu7GRZqJeZxgROrqEWeiQSHhA9ruE.1vpjAaPXna",
            "createdAt": "2017-03-29T08:24:46.296Z",
            "updatedAt": "2017-03-29T08:31:13.852Z",
            "roleId": 2
        }

            
### Deletes a User [DELETE]

You can delete a User. This is a DELETE request that takes in a
parameter (id) and deletes the user that matches that id. It returns
a success message.


+ Response 201 (application/json)

        { 
            message: 'User successfully deleted'
        }

## User Collection [api/users/?username=Reshy]

### Search User by name [GET]

You can find a user by their username. This is a GET request that takes in
a username query and finds a user that matches that username. It returns
the found user object.

+ Response 200 (application/json)

        {
            "id": 4,
            "username": "Reshy",
            "email": "resh@trail.com",
            "password": "$2a$10$G47tWnTldAwGpKu7GRZqJeZxgROrqEWeiQSHhA9ruE.1vpjAaPXna",
            "createdAt": "2017-03-29T08:24:46.296Z",
            "updatedAt": "2017-03-29T08:31:13.852Z",
            "roleId": 2
        }

----------------------------------------------------------------------------------

## Document Collection [api/documents]

### Get All Documents [GET]

You can view all documents. This is a GET request that returns all records in the
document table.

+ Response 201 (application/json)
        
        [
            {
                "id": 1,
                "title": "The art of being",
                "content": "A person who has not been completely alienated",
                "access": "public",
                "createdAt": "2017-03-23T12:53:00.051Z",
                "updatedAt": "2017-03-28T21:36:07.673Z",
                "userId": 1
            },
            {
                "id": 2,
                "title": "Knowledge",
                "content": "There is no wealth like knowledge, and no poverty like ignorance. - Buddha",
                "access": "public",
                "createdAt": "2017-03-23T12:53:00.051Z",
                "updatedAt": "2017-03-28T21:40:56.001Z",
                "userId": 2
            }
        ]

### Create a New Document [POST]

You can add a document. This is a POST request that creates a new document. It
accepts a JSON object that contains the new document's title, content and access
preference. If access is not specified, private is the default value.


+ Request (application/json)

        {
            "title": "Clouds"
            "content": "The origin of the term cloud can be found in the old English clud or clod, meaning a hill or a mass of rock.",
            "access": "private"
        }

+ Response 201 (application/json)

        {
            "message": "You have successfuly created a document",
            "document": {
            "id": 3,
            "title": "Clouds",
            "content": "The origin of the term cloud can be found in the old English clud or clod, meaning a hill or a mass of rock.",
            "access": "private",
            "userId": 4,
            "updatedAt": "2017-03-29T09:10:02.413Z",
            "createdAt": "2017-03-29T09:10:02.413Z"
            }
        }
        

## Document Collection [api/documents/4]

### Updates a Document [PUT]

You can update a document. This is a PUT request that recieves a
JSON object containing the variable the user wants to change assigned to
the new value. It returns a success message.

+ Request (application/json)

        {
            "title": "Cloudy"
        }

+ Response 200 (application/json)

        {
          "message": "Your changes have been successfully applied"
        }

### Get a Document by id [GET]

You can find a document by their id. This is a GET request that takes in
a parameter (id) and finds the document that matches that id. It returns
the found document object.

+ Response 200 (application/json)

        {
            "id": 15,
            "title": "Cloudy",
            "content": "The origin of the term cloud can be found in the old English clud or clod, meaning a hill or a mass of rock.",
            "access": "private",
            "createdAt": "2017-03-29T09:10:02.413Z",
            "updatedAt": "2017-03-29T09:15:02.212Z",
            "userId": 4
        }

            
### Deletes a Document [DELETE]

You can delete a document. This is a DELETE request that takes in a
parameter (id) and deletes the document that matches that id. It returns
a success message.


+ Response 201 (application/json)

        { 
            "message": "Document successfully deleted"
        }

### Search a Document by title [GET]

You can find a document by their title. This is a GET request that takes in
a title query and finds a document that matches that title. It returns
the found document object.

+ Response 200 (application/json)

        {
            "id": 4,
            "username": "Reshy",
            "email": "resh@trail.com",
            "password": "$2a$10$G47tWnTldAwGpKu7GRZqJeZxgROrqEWeiQSHhA9ruE.1vpjAaPXna",
            "createdAt": "2017-03-29T08:24:46.296Z",
            "updatedAt": "2017-03-29T08:31:13.852Z",
            "roleId": 2
        }

----------------------------------------------------------------------------------

## Role Collection [api/roles]

### Get All Roles [GET]

You can view all roles. This is a GET request that returns all records in the
role table.

+ Response 201 (application/json)
        
        [
            {
                "id": 1,
                "name": "ADMIN",
                "createdAt": "2017-03-23T12:52:59.445Z",
                "updatedAt": "2017-03-23T12:52:59.445Z"
            },
            {
                "id": 2,
                "name": "Users",
                "createdAt": "2017-03-23T12:52:59.445Z",
                "updatedAt": "2017-03-23T12:52:59.445Z"
            }
        ]

### Create a New Role [POST]

You can add a role. This is a POST request that creates a new role
by accepting a JSON object that has the new role name.


+ Request (application/json)

        {
            "name": "Support"
        }

+ Response 201 (application/json)

        {
            "message": "You have created a role!",
            "role": {
            "id": 4,
            "name": "Support",
            "updatedAt": "2017-03-29T09:19:36.955Z",
            "createdAt": "2017-03-29T09:19:36.955Z"
            }
        }
