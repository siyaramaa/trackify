const express = require('express');
const router = express.Router();


//Importing controllers for the routes (Methods)
const {delIncome,delUser, delExpense, getAllExps, getExpenses,loginUser, createUser, getAllUsers, getAllIncomes, getIncomes, addIncome, addExpense, getUserById, selectAvatar } = require('../controllers/contollers');



//Route for default page or home page
router.get('/', (req,res) => {
    res.status(200).json({'message': 'Sita Rama, This is backend for exp tracker'});
})


//Route to create a users account
router.post('/api/createUser', createUser);

//Route to delete a user's account with account id.
router.delete('/api/user/delete?:id', delUser);

//Route to upload a profile picture
router.post('/api/selectAvatar', selectAvatar);

//Route to get user details by id
router.get('/api/userDetails?:id', getUserById);

//Route to login to account
router.post('/api/login', loginUser);

//Router to get all users
router.get('/api/users', getAllUsers);

//Router to add expenses to the database
router.post('/api/addExpense', addExpense)

//Route to get all expenses details of the database
router.get('/api/expenses', getAllExps);

//Route to get list of expenses of a specific person
router.get('/api/expense?:id', getExpenses);

//Route to add incomes to the database
router.post('/api/addIncome', addIncome)

//Route to get all income details stored in the database
router.get('/api/incomes', getAllIncomes);

//Route to get list of incomes of a specific person
router.get('/api/income?:id', getIncomes);

//Route to delete a specific income item from database with it's id.
router.delete('/api/income/delete?:id', delIncome);

//Route to delete a specific item from database with it's id.
router.delete('/api/expense/delete?:id', delExpense);







//Exporting routes 
module.exports = router;
