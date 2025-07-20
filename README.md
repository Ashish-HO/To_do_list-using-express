# To-Do List with JWT Authentication

A simple To-Do List application that uses JWT (JSON Web Token) for secure user authentication.

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete to-do items
- Secure routes that require authentication
- Persistent storage of user data and to-do lists

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ashish-HO/To_do_list-using-express/
   cd your-repo-name
2. Install dependencies:

    (if using Node.js and npm)
     ```bash
    npm install 

   
3. Set up environment variables:
   Create a .env file and add  variables:
      MONGODB_URL=
      PORT=
      AUTH_PRIVATE_KEY=


4. Run the application :
   index.js as main file in root directory
   ```bash
   node index.js

| END POINT | METHOD  | DESCRIPTION|
| --------------- | --------------- | --------------- |
| /api/user  | POST  | 	Register a new user  |
| /api/user  | get  | 	view all users by admin only |
|  /api/auth |  POST  |  Authenticate user input |
|  /api/task | GET   |  View all tasks  |
|  /api/task/:taskid |  GET  | View particular task  |
|  /api/task | POST   | create a task  |
|  /api/task/:taskid | POST   | Update particular task  |
|  /api/task/:taskid | PATCH     | mark task as complete  |
|  /api/task/:taskid | DELETE     | Delete task  |


