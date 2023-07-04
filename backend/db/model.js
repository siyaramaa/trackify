//Importing Mongoose
const mongoose = require('mongoose');
//Destructuring Schema and Model from Mongoose
const {Schema, model} = mongoose;



//Creating a schema for users
const userModel = new Schema({
            username: {type: String, required: true},
            email: {type: String, required: true},
            password: {type: String, required: true},
            profilePicture: {type: String},
            acCreatedOn: {type: String},                     
})



//Creating a schema for expenses
const expModel = new Schema({
        title: {type: String, required: true},
        type:{
            type: String,
            required: true,
        },
        category: {type: String},
        amount: {type: Number, required: true},
        description: {type: String},
        createdAt: {type: String},
        createdBy: {type: String, required: true},
})




//Creating a schema for incomes
const incModel = new Schema({
    title: {type: String, required: true},
    type:{
        type: String,
        required: true,
    },
    category: {type: String},
    amount: {type: Number, required: true},
    description: {type: String},
    createdAt: {type: String},
    createdBy: {type: String},
})



//Creating a model for expenses, user and income
const expenses = model('expenses', expModel);
const users = model('users', userModel);
const incomes = model('incomes', incModel);

//Exporting models
module.exports = {expenses, users, incomes};