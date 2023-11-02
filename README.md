# Spelling Bee Application
This full-stack MERN (MongoDB, Express.js, React, Node.js) application replicates a spelling bee game. The user can play as many times as they want with continuously randomized words. They will be able to compare their results to other users playing the game. They will be required to login with an email to use this app, we will not send the user any emails, it is stricly for logging in purposes. Have fun and happy spelling!


# Getting Started:
Please have Node.js and npm installed before attempting this
Make sure you have a MongoDB account to set up the server

Clone the repository onto your computer:
``` 
git clone https://github.com/20apaumier/CS361-Spelling-Bee.git
cd your-repo-name
```

Install the necessary dependencies:
```
cd server
npm install
```
```
cd spelling-bee
npm install
```

Setup the environment variables for the server:
- Create a .env file in the server directory
- Add the following:

```
MONGO_URL = your_mongo_db_connection_string
JWT_SECRET = your_jwt_secret_key
```

# Running the application
Use two seperate terminals to ensure they are both running at the same time.

Start the server:
```
cd server
node index.js
```
this will run on port 8000.

Start the client:
```
cd client
npm start
```
this will run on port 3000.

You can then visit the link provided after running npm start and start playing!
