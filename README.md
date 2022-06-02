# Transactions-Sample-Assessment

Assuming Node.js is already donwloaded, to start, you can run 'npm install' to ensure all dependencies are downloaded- this project depends on Express.

To run the server make sure you are in the node-js-members folder and run the server.js file by running either 'node server.js' or 'npm start' in the terminal.

The server should run on local host 3000 and going to localhost:3000 will display all of the data within the transactions json file.

Going to the endpoint '/api' and you can do a number of different searches to find data depending on finding information by id, account number, or any other key search parameter listed in the transactions file.

For example, in Postman if I add parameters IdType = 0 and AccountNumber = 0000725149 (or go to http://localhost:3000/api/search?IdType=0&AccountNumber=0000725149), I will have an array of all the objects in transactions.json with those parameters returned to me.
