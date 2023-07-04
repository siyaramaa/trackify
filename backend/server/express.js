//Importing and initializing Express
const express = require('express');
const cors = require('cors');

require('dotenv').config({path: `D:/codeplayground/Expense Tracker/backend/.env`});


//Initializing app
const app = express();
//Getting PORT from env
const PORT = process.env.PORT || 3000;
//Importing Routes
const routes = require('./routes/routes')

//Connecting to Mongo database
require('../db/db.js');


//Using  Middlewares
app.use(cors());
app.use(express.json({limit: '10mb'}));


//Using Routes Middlewares
app.use(routes);


//Running the server on local host, PORT should be changed later in production.
app.listen(PORT, ()=> {
        console.log("Server is Running on", PORT);
})