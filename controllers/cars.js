const Car = require('../models/car');
const User = require('../models/user');

module.exports = {
    index: async (req, res, next) => {
        //Get all the cars
        const cars = await Car.find({});
        res.status(200).json(cars);
    },

    newCar: async (req, res, next) => {
        // 1. Find the actual seller
        const seller = await User.findById(req.value.body.seller);

        // 2. create a new car
        const newCar = req.value.body;
        delete newCar.seller;

        const car = new Car(newCar);
        car.seller = seller;//seller === find actual seller, argument first 
        await car.save();

        // 3. and newly created car to the actual seller
        seller.cars.push(car);
        /**
         * seller refer to car model,
         * inside it, there is user model, who we called cars
         * then object cars push the value of car
         * then done!
         */
        await seller.save();

        // we're done!
        res.status(200).json(car)
    },

    getCar: async (req, res, next) => {
        const car = await Car.findById(req.value.params.carId);
        res.status(200).json(car);
    },

    replaceUser: async (req, res, next) => {
        const { carId } = req.value.params;
        const newCar = req.value.body;
        const result = await Car.findByIdAndUpdate(carId, newCar);
        res.status(200).json({ success: true});
    },

    updateCar: async (req, res, next) => {
        const { carId } = req.value.params;
        const newCar = req.value.body;
        const result = await Car.findByIdAndUpdate(carId, newCar);
        res.status(200).json({ success: true });
    },

    deleteCar: async (req, res, next) => {
        const { carId } = req.value.params;

        //Get a car
        const car = await Car.findById(carId);
        if(!car){
            return res.status(404).json({ error: 'car doesn\'t exist'});
        }

        const sellerId = car.seller;

        //Get a seller
        const seller = await User.findById(sellerId);

        //remove the car
        await car.remove();

        //remove car from the seller's selling list
        seller.cars.pull(car);
        await seller.save();

        res.status(200).json({ success: true })

    }

}