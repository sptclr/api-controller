const User = require('../models/user');
const Car = require('../models/car');

const Joi = require('joi');


module.exports = {

    //validation : DONE
    index: async (req, res, next) => {
        // try{
        const users = await User.find({});
        // throw new Error('dummy error');
        res.status(200).json(users);

        // }catch(err){
        //     next(err)
        // }
       
    },

    //validation : DONE
    newUser: async (req, res, next) => {
        // try{
        const newUser = new User(req.value.body);
        const user = await newUser.save();
        res.status(201).json(user);
        // }catch(err){
        //     next(err)
        // }
        
    },

    //validation : DONE
    getUser: async (req, res, next) => {
        //New Way
        const { userId } = req.value.params;

        // const { userId } = req.params; //Old Way

        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    // replaceUser : async (req, res, next) => {
    //     const { userId } = req.params;
    //     const newUser = req.body;
    //     // console.log(req)

    //     console.log('user id', userId);
    //     console.log('new user is', newUser);
    // },

    //validation : DONE
    replaceUser: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        console.log('result', result)
        res.status(200).json({
            success: 'true'
        });
    },

    //validation : DONE 
    updateUser : async (req, res, next) => {
        //req.body may contain any number of fields
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        console.log('result', result)
        res.status(200).json({
            success: 'true'
        });
    },

    //validation : DONE 
    getUserCars: async (req, res, next) => {
        const { userId } = req.value.params;
        const user = await User.findById(userId).populate('cars');
        // console.log('user', user)
        res.status(200).json(user.cars)
    },

    newUserCar: async (req, res, next) => {
        const { userId } = req.value.params;
        // Create a new Car
        const newCar = new Car(req.value.body);
        // console.log('newCar', newCar)
        //Get User
        const user = await User.findById(userId)
        // Assign user as a car's seller
        newCar.seller = user;
        //Save the car
        await newCar.save();
        //Add car to the user's selling array 'cars'
        user.cars.push(newCar);
        //Save the user
        await user.save();
        res.status(201).json(newCar);
    },

    deleteUser: async (req, res, next) => {
        const { userId } = req.value.params;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({ error: 'car doesn\'t exist'});
        }

        const deleteUser = await user.remove()

        await user.save();
        res.status(200).json({ success: true})
    }
}