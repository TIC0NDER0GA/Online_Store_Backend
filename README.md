Here are the instructions/scripts you need to run my project:
1. npm i
    - installs all neccessary dependencies
2. npm run dockerup
    - Note docker desktop needs to be running in the background
    - the database runs on localhost:5432
3. npm run migrate-up
    - Sets up the test data I've provided for usage in the database
4. npm run start
    - starts the server and exposes the endpoints
    - the endpoints run on localhost:3000
5. npm run migrate-down
    - clears the postgress db
6. npm run dockerdown
    - used for when you want to stop using docker
    - don't forget to cancel the express server as well with crtl + C or any eqivalent cmd

IMPORTANT!!!:
Make sure to set up the .env file with it's appropriate values
Should be in the requirements.md
yarn is not used in this project I used npm

TESTING:
npm run test
    - this tests all of the functions that connect to my postgress test database

ENDPOINT TESTING:
1. I used postman for desktop to test all my endpoints
2. I have provided a collection that makes it easy to send requests to my backend 
3. Make sure to set the collection variable to the token you recieve from the create user endpoint
    - the jwt token in there currently may not work
4. Enjoy!