const { faker } = require("@faker-js/faker");
const app = require("express")();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
const mongoose = require("mongoose");
require ('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("./Models/userModel");

const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET
const carmodel = require('./Models/CarModel');
const bodyParser = require("body-parser");
const express = require('express');

const cookieParser = require('cookie-parser')


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/carsApiDb")
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static('public'))
// app.use(express.static(__dirname));
// app.use(express.static(__dirname + "/" + "css" + "/"));
// app.use(express.static(__dirname + "/" + "css"));

require("./routes/routes")(app);


const MongoClient = require('mongodb').MongoClient;

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

async function seedDB() {
    // Connection URL
    const uri = "mongodb://localhost:27017/carsApiDb";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("carsApiDb").collection("cars");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 15; i++) {
            const brand = faker.vehicle.vehicle();
            const price = faker.finance.amount(25, 100, 2,);
            const seller = faker.name.fullName();
            const location = faker.address.country();
            const year = randomIntFromInterval(1990, 2020);
            const color = faker.vehicle.color();
            let car = {
              
                    brand: brand,
                    price,
                    seller,
                    location,
                    year,
                    color,
            };

            
            timeSeriesData.push(car);
        }
        collection.insertMany(timeSeriesData);

        console.log("Database seeded! :)");
        
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();

// set up engine

app.set('view engine', 'ejs');


app.post("/login", async (req, res, next) => {
   
    let { email, password } = req.body;
    
    let existingUser;
    
    try {
      existingUser = await User.findOne({ email: email });
    } catch {
       return res.status(400).json((err))
    }
    
  
    if (!existingUser || !await bcrypt.compare(req.body.password,existingUser.password)) {
      const error = Error("Wrong details please check at once");
      return res.status(400).json(next(error))
    }
    
    let token;
    
    try {
      //Creating jwt token
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email, role: existingUser.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    console.log(token);
    res.status(200).json({
      success: true,
      data: {
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
      },
    });
  });

  app.post("/login/admin", async (req, res, next) => {
   
    let { email, password } = req.body;
    
    let existingAdmin;
    
    try {
      existingAdmin = await Admin.findOne({ email: email });
    } catch {
       return res.status(400).json((err))
    }
    
  
    if (!existingAdmin || !await bcrypt.compare(req.body.password,existingAdmin.password)) {
      const error = Error("Wrong details please check at once");
      return res.status(400).json(next(error))
    }
    
    let token;
    
    try {
      //Creating jwt token
      token = jwt.sign(
        { adminId: existingAdmin.id, email: existingAdmin.email, role: existingAdmin.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    console.log(token);
    res.status(200).json({
      success: true,
      data: {
        adminId: existingAdmin.id,
        email: existingAdmin.email,
        token: token,
      },
    });
  });
  
  // Handling post request
  app.post("/signup", async (req, res, next) => {
    const { name, email, password } = req.body;
    const newUser = User({
      name,
      email,
      password,
    });
  
    try {
      await newUser.save();
    } catch (err){
      res.status(401).json(next(err))
     
    }
    let token;
  
    try {
      token = jwt.sign(
        { userId: newUser.id, email: newUser.email, role: newUser.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
    } catch (err) {   
        console.log(JWT_SECRET);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    res.status(201).json({
      success: true,
      data: { userId: newUser.id, email: newUser.email, role: newUser.role, token: token },
    });
  });

  app.post("/signup/admin", async (req, res, next) => {
    const { name, email, password } = req.body;
    const newAdmin = Admin({
      name,
      email,
      password,
      role,
    });
  
    try {
      await newAdmin.save();
    } catch (err){
      res.status(401).json(next(err))
     
    }
    let token;
  
    try {
      token = jwt.sign(
        { adminId: newAdmin.id, email: newAdmin.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
    } catch (err) {   
        console.log(JWT_SECRET);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    res.status(201).json({
      success: true,
      data: { adminId: newAdmin.id, email: newAdmin.email, token: token },
    });
  });
  
  // get index page 
 


  app.get('/accessResource', (req, res)=>{  
      
      const token2 = req.headers.authorization
      // if token is invalid or not present in the header then it will return 401
      
      if(token2==undefined){
          const error = Error("Wrong details please check at once");
         
       return res.status(401).json({message: "Unauthorized"})
      }
      const token = token2.split(' ')[1]; 
      //Authorization: 'Bearer TOKEN'
      
    
  
       
      // verify a token symmetric
      jwt.verify(token, JWT_SECRET, function(err, decoded) {
      });
  
      if(!token)
      {
          res.status(200).json({success:false, message: "Error! Token was not provided."});
      }
      //Decoding the token
      const decodedToken = jwt.verify(token,JWT_SECRET, function(err, decoded) {
          if(err){
              res.status(400).json({success:false, message: "Error! Token is invalid."});
          }
          return decoded;
      });
  
      res.status(200).json({success:true, data:{userId:decodedToken.userId,
       email:decodedToken.email}});   
  }),

/*
const cars = [
    {id: 1, brand: 'Ford', model: 'Fusion Hybrid', year: 2019},
    {id: 2, brand: 'Tesla', model: 'Model S', year: 2019},
    {id: 3, brand: 'Toyota', model: 'Prius', year: 2019},
    {id: 4, brand: 'Honda', model: 'Civic', year: 2019},
];

//Saame autod id kaudu

app.get('/cars/:id', (req, res) => {
    
    if(!(parseInt(req.params.id))){
        res.status(400).send('Id must be a number');
        return;
    }
    let result = cars.find(car => car.id === parseInt(req.params.id));
    if(typeof (result) === 'undefined'){
        res.status(404).send('Id not found');
        return;
    }
    res.send(result);

});

app.get('/cars', (req, res) => {
    res.send(cars); 
});

app.post('/car', (req, res) => {
    cars.push({
        id: cars.length + 1,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year
    })

    res.end();
});
*/


// make seeding data
app.get('/seed', (req, res) => {
    const car = [
        {brand: 'Ford', model: 'Fusion Hybrid', year: 2019, owner: 'John', seller: 'John', price: 10000, location: 'Tallinn'},
        {brand: 'Tesla', model: 'Model S', year: 2019, owner: 'John', seller: 'John', price: 10000, location: 'Tallinn'},
        {brand: 'Toyota', model: 'Prius', year: 2019, owner: 'John', seller: 'John', price: 10000, location: 'Tallinn'},
        {brand: 'Honda', model: 'Civic', year: 2019, owner: 'John', seller: 'John', price: 10000, location: 'Tallinn'},
    ];

    carmodel.insertMany(car, (err, docs) => {
        if(err){
            res.status(400).send(err);
        } else{
            res.status(201).send(docs);
        }
    });
});



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
    console.log(`API up at http://localhost:${port}`)
});