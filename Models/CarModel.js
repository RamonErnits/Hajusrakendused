
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CarSchema = new Schema({
    brand: { 
        type: String, 
        required: "Car brand is required" 
    },
    model: {
        type: String,
        required: "Car model is required"
    },
    price : {
        type: Number,
        required: "Car price is required"
    },
    year: {
        type: Number,
        required: "Car year is required"
    },
    owner : {
        type: String,
        required: "Car owner is required"
    },
    seller : {
        type: String,
        required: "Car seller is required"
    },
    
    location : {
        type: String,
        required: "Car location is required"
    },
    color : {
        type: String,
        required: "Car color is required"
    }

});


module.exports = mongoose.model('cars', CarSchema);
