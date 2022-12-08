const mongoose = require('mongoose');
const CarDTO = require('../Models/CarsDTO');
const Car = mongoose.model('cars');
const CarModel = require('../Models/CarModel');

//get all car ads
exports.getAllCars = function (req, res) {
    Car.find({}, (err, car) => {
        if (err) {
            res.send(err);
        }
        res.json(car);
    });
};

// create new add
exports.createNew = function (req, res, next) {
    const newCar = new Car(req.body);
    newCar.save((err, car) => {
        if (err) {
            res.status(400).send(err);
        } else{
            res.status(201).json(car);
        }
    });

};

exports.getCar = function (req, res) {
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    Car.findOne({ _id: (req.params.id) }, (err, car) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).json(new CarDTO(car))
        }
    })
    return
};

exports.editCar = function (req, res) {
    // edit car by id
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
   console.log('edit car req body: ',req.body);
   Car.updateOne({_id: (req.params.id)},{$set: req.body},null,(err,car)=>{
        
        if (err) {
            res.status(400).send(err)
        } else {
            console.log("edit car", car);
            res.status(200).json(car)
        }
    })

};

exports.deleteCar = function (req, res) {
    if (!(parseInt(req.params.id) > 0)) {
        res.status(400).send({ error: "ID must be a positive integer" })
        return
    }
    console.log("deleted");
    Car.deleteOne({ _id: (req.params.id) }, (err, car) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).json(car)
        }
    })

};