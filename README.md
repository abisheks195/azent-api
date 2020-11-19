# MERN Azent API

> CRUD API to get all the universitites from the database and to add, update and delete from it. Also to search for any university based on the name, country code or the domain.

## Quick Start

If you are using a local mongodb server, add the localhost URI for Mongodb directly to app.js or if you're using Mongodb from cloud, you can create a new .env file and store your URI in variable named MONGODB. Similarly, for elasticsearch, if it is running locally, you can directly add it to config/esconfig.js or if you're connecting to elasticsearch cloud, then you can store your elasticsearch URI in a variable named ESHOST and your username and password in the format , 'username:password', in a variable named ESHTTPAUTH in the .env file. Also make sure to change the port variable in app.js to 8000 or any port of your choice and store it in a variable named PORT in the .env file.

```bash
# Install dependencies for backend server
npm install

# Install dependencies for frontend client
npm run client-install

# Run the backend nodejs(express) server only
npm run server

# Run the frontend React client only
npm run client

# Run the client & server with concurrently
npm run dev

# Backend Server runs on http://localhost:8000 and Frontend Client on http://localhost:3000
```

## Deployment

There is a Heroku post build script in package.json so that you do not have to compile your React frontend manually, it is done on the server. Simply push to Heroku and it will build and load the client index.html page

### Author

Abishek Srinivasan
