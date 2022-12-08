
const { faker } = require('@faker-js/faker');


const car = [
    {id: 1, brand: 'Ford', model: 'Fusion Hybrid', year: 2019, price: 30000, owner: 'John Doe', seller: 'Jane Doe', location: 'New York'},
    {id: 2, brand: 'Tesla', model: 'Model S', year: 2019, price: 100000, owner: 'John Doe', seller: 'Jane Doe', location: 'New York'},
    {id: 3, brand: 'Toyota', model: 'Prius', year: 2019, price: 25000, owner: 'John Doe', seller: 'Jane Doe', location: 'New York'},
    {id: 4, brand: 'Honda', model: 'Civic', year: 2019, price: 20000, owner: 'John Doe', seller: 'Jane Doe', location: 'New York'},
    {id: 5, brand: 'BMW', model: 'X5', year: 2019, price: 50000, owner: 'John Doe', seller: 'Jane Doe', location: 'New York'},
    {id: 6, brand: 'Audi', model: 'A6', year: 2019, price: 40000, owner: 'John Doe', seller: 'Jane Doe', location: 'New York'},
    {id: 7, brand: 'Mercedes', model: 'S500', year: 2019, price: 60000, owner: 'John Doe', seller: 'Jane Doe', location: 'New York'},
    {id: 8, brand: 'Volvo', model: 'XC90', year: 2019, price: 45000, owner: 'John Doe', seller: 'Jane Doe', location: 'New York'},
    {id: 9, brand: 'Volkswagen', model: 'Golf', year: 2019, price: 15000, owner: 'John Doe', seller: 'Jane Doe', location: 'New York'},
    {id: 10, brand: 'Nissan', model: 'Leaf', year: 2019, price: 20000, owner: 'John Doe', seller: 'Jane Doe', location: 'New York'},
];

for (let i = 0; i < 20; i++) {
    const randomName = faker.vehicle.vehicle();
    const price = faker.finance.amount(25, 100, 2, '$');
    const seller = faker.name.fullName();
    const location = faker.address.cityName();
    const year = randomIntFromInterval(1990, 2020);
    const color = faker.vehicle.color();
    console.log(randomName, price, "k","\n", "Seller:", seller, "\n", "Location:", location, "\n", "Year:", year, "\n", "Color:", color, "\n");
}


exports.getAll = function(req, res) {
    res.send(car);
};

exports.createNew = function(req, res) {    //Create
    const length = car.push(req.body);
    car[length - 1] = {id : car[length-2].id+1, ...car[length - 1]};
    res.status(201).json(car[length - 1]);
};

exports.getcarById = function(req, res) {      //Read
    if(!(parseInt(req.params.id) > 0)){
        res.status(400).send('Id must be a positive integer');
        return;
    }
    let result = car.find(car => car.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    res.send(result);
};

exports.editCar = function(req, res) {     //Update
    if(!(parseInt(req.params.id) > 0)){
        res.status(400).send('Id must be a number');
        return;
    }
    const index = car.findIndex(x => x.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    car[index] = {...car[index], ...req.body};

    res.status(200).json(car[index]);
    
};

exports.deleteCar = function(req, res) {    //Delete
    if(!(parseInt(req.params.id))){
        res.status(400).send('Id must be a number');
        return;
    }
    let result = car.find(car => car.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    const index = car.indexOf(result);
    car.splice(index, 1);
    res.status(200).json(result);
        
};

exports.getSellerById = function(req, res) {
    if(!(parseInt(req.params.id) > 0)){
        res.status(400).send('Id must be a positive integer');
        return;
    }
    let result = car.find(car => car.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    res.send(result.seller);
};

exports.getOwnerById = function(req, res) {
    if(!(parseInt(req.params.id) > 0)){
        res.status(400).send('Id must be a positive integer');
        return;
    }
    let result = car.find(car => car.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    res.send(result.owner);
};

exports.getLocationById = function(req, res) {
    if(!(parseInt(req.params.id) > 0)){
        res.status(400).send('Id must be a positive integer');
        return;
    }
    let result = car.find(car => car.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    res.send(result.location);
};

exports.getPriceById = function(req, res) {
    if(!(parseInt(req.params.id) > 0)){
        res.status(400).send('Id must be a positive integer');
        return;
    }
    let result = car.find(car => car.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    res.send(result.price);
};


    