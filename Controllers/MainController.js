
require ('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET
const bodyParser = require('body-parser');
const User = require("../Models/userModel");
const { request } = require('express');
const app = express();



app.use(express.static('public'));


exports.getIndexPage = (req, res) => {

  res.render('index');
  
};



exports.getPostPage = (req, res) => {
  res.render('post');
};



exports.getMyPostsPage = (req, res) => {
  res.render('posts');
};

exports.getSellersPage = (req, res) => {
  res.render('sellers');
};

exports.getLocationsPage = (req, res) => {
  res.render('locations');
};

exports.getRegisterPage = (req, res) => {
    res.render('register');
};


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

exports.getLoginPage = (req, res) => {
    res.render('login');
};
exports.postLogin = async (req, res, next) => { 
  
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
      { userId: existingUser.id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
 
    console.log(token);
    res.redirect('index')
    };
  

exports.postRegister = async (req, res, next) => {
    console.log("Register body: ",req.body);
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
          { userId: newUser.id, email: newUser.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );
      } catch (err) {   
          console.log(JWT_SECRET);
        const error = new Error("Error! Something went wrong.");
        return next(error);
      }
      
    res.redirect('login')

};


exports.getLogout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.redirect('login');
}







