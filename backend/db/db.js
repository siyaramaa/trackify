require('dotenv').config({path: `D:/codeplayground/Expense Tracker/backend/.env`});

const db = process.env.dbLink;
//Importing Mongoose
const mongoose = require('mongoose');

//Connecting to database using mongoose with the URI
mongoose.connect(db).then(() => {
        console.log("Connected to database succesfully...");
}).catch((err) => {
        //Printing error if any error occurs
        console.log(err);
})


