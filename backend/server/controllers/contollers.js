const jwt = require('jsonwebtoken');

//Improting models
const {users, expenses, incomes} = require('../../db/model');

//Creating function to create user
const createUser  = async (req, res) => {
    const {username,email,password} = req.body;

    const isAvailable = await users.find({email: email})
    if(isAvailable.length > 0) return res.status(200).json({'error': 'This Email already exists'})

    try {
        const user = await users.create({
                        username: username,
                        email: email,
                        password: password,
                        profilePicture: '',
                        acCreatedOn: new Date().toISOString(),
        })
        const result = await user.save();
        res.status(200).json({'success': result});
    } catch (error) {
        res.status(201).json({'error': error});
    }
}

//function to delete account of a user with account's id.
const delUser = async (req,res) => {
        const userId = req.query.id;
    
    try {
        //Deleting user's account.
        const accDelReq = await users.findByIdAndDelete({_id: userId});
        //Deleting user's income and expense data.
        const incDelReq = await incomes.deleteMany({createdBy: userId});
        const expDelReq = await expenses.deleteMany({createdBy: userId});
        if(accDelReq.deletedCount != 0){
            return res.status(200).json({'success': 'Succesfully deleted your account.'});
           }
    } catch (error) {
        console.log(error);
        res.status(400).json({'error': "Sorry, Your account couldn't be deleted at the moment."});

    }

}

//Creating a function to upload profile picture
const selectAvatar = async (req, res) => {

        const {selectedImage, userId} = req.body;

        try {
            const uploadImg = await users.findByIdAndUpdate(userId, {profilePicture: selectedImage});
            const result = await uploadImg.JSON();
            console.log(result);
            res.status(200).json({'success': "Uploaded Sucessfully."});
        } catch (error) {
            res.status(201).json({'error': error});
        }

}

//Creating function to login user
const loginUser  = async (req, res) => {
    const {email,password} = req.body;
    const isAvailable = await users.find({email: email, password: password});
    if(isAvailable.length == 0) return res.status(404).json({'error': 'Email or Password does not match'});
    const userId = isAvailable[0]._id.toString();

    const token = jwt.sign({
            id: userId
    }, process.env.JWT_SECRECT_KEY);

    token && res.status(200).json({'token': token, 'avatarSelected': isAvailable[0].profilePicture === ""  ? false : true});
}



//Creating function to get all expenses from database
const getAllExps  = async (req, res) => {
        const data = await expenses.find({});
        if(data.length == 0){
            return res.status(200).json({'message': "There are 0 expenses.", 'len': data.length});
        }
        res.status(200).json([{'result': data}, {'len': data.length}]);
}

//Creating function to get all incomes from database
const getAllIncomes  = async (req, res) => {
    const data = await incomes.find({});
    if(data.length == 0){
        return res.status(200).json({'message': "There are 0 incomes.", 'len': data.length});
    }
    res.status(200).json([{'result': data}, {'len': data.length}]);
}

//Creating function to get all expenses of a specific person by users id.
const getExpenses  = async (req, res) => {
    const userId = req.query.id;
    const data = await expenses.find({createdBy: userId});
    if(data.length == 0){
        return res.status(200).json({'message': "You do not have any expenses.", 'len': data.length});
    }
    res.status(200).json({'result': data , 'len': data.length});
}


//Creating function to get all incomes of a specific person by users id.
const getIncomes  = async (req, res) => {
    const userId = req.query.id;
    const data = await incomes.find({createdBy: userId});
    if(data.length == 0){
        return res.status(200).json({'message': "You do not have any incomes.", 'len': data.length});
    }
    res.status(200).json({'result': data, 'len': data.length});
}


//Creating a function to get all users
const getAllUsers = async (req,res) => {
        const data = await users.find({});
        if(data.length == 0){
            return res.status(200).json({'message': "We did not find any users.", 'len': data.length});
        }
        res.status(200).json(data);
}

//Creating a function to get user details with user ID.
const getUserById = async (req,res) => {
        const userId = req.query.id;
        try {
            const userData = await users.find({_id: userId});
            if(userData.length == 0) return res.status(502).json({'usernotfound': `User with id: ${userId} does not exist`});
            return res.status(200).json({'userDetail': userData});

            
        } catch (error) {
            return res.status(403).json({'error': `Got Error, Please check your userId: ${userId} and try again with a valid id.`});

        }
}


//Function to add expenses to the database
const addExpense = async (req,res) => {
        const {title, 
            type,
             category,
              amount, 
              description, 
              createdBy} = req.body;

        try {
            const exp = await expenses.create({
                title: title,
                type: type,
                category: category,
                amount: amount,
                description: description,
                createdAt: new Date().toISOString(),
                createdBy: createdBy,
            })
            const result = await exp.save();
            res.status(200).json({'success': result});
        } catch (error) {
            res.status(201).json({'error': error});

        }

}

//Function to add incomes to the database
const addIncome = async (req,res) => {
    const {title, 
        type,
         category,
          amount, 
          description, 
          createdBy} = req.body;

    try {
        const income = await incomes.create({
            title: title,
            type: type,
            category: category,
            amount: amount,
            description: description,
            createdAt: new Date().toISOString(),
            createdBy: createdBy,
        })
        const result = await income.save();
        res.status(200).json({'success': result});
    } catch (error) {
        res.status(201).json({'error': error});

    }

}

//Function to delete income from database
const delIncome = async (req,res) => {
        const del_id = req.query.id;        
        const delItem = await incomes.deleteOne({_id: del_id});
        if(delItem.deletedCount != 0){
         return res.status(200).json(delItem);
        }
        res.status(201).json({'error': "Couldn't delete requested item."});
}

//Function to delete income from database
const delExpense = async (req,res) => {
    const del_id = req.query.id;        
    const delItem = await expenses.deleteOne({_id: del_id});
    if(delItem.deletedCount != 0){
     return res.status(200).json(delItem);
    }
    res.status(201).json({'error': "Couldn't delete requested item."});
}








//Exporting methods or functions to use in routes
module.exports = {getUserById,delUser, selectAvatar, getAllExps, getExpenses, createUser, getAllIncomes, getIncomes, getAllUsers, addExpense, addIncome, delIncome, delExpense, loginUser};