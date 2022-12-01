require ('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET
const bodyParser = require('body-parser');
const User = require("../Models/userModel");
const { request } = require('express');
const { restart } = require('nodemon');
const app = express();



exports.getLoginPage = (req, res) => {
    res.render('login', {title: "Login"});
};



exports.postLogin = async (req, res, next) => { 
  
  const { role, email, password } = req.body;
    
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email, role: role });
  } catch {
     return res.status(400).json((err))
     
  }
  

  if (!existingUser || !await bcrypt.compare(req.body.password,existingUser.password)) {
    
    res.status(400).json({message: "Invalid credentials, please try again."});
    
  }
  
  let token;

  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email, role: existingUser.role, name: existingUser.name },
      JWT_SECRET,
      { expiresIn: "2 days" }
    );
  } catch (err) {
    console.log(err);
  }

 res.cookie('jwt', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 })

  
 

if(role === "admin"){
  res.redirect('/admin');
  const token = jwt.sign({ userId: existingUser.id, email: existingUser.email, role: existingUser.role, name: existingUser.name  }, JWT_SECRET, { expiresIn: "2 days" });
}


if(role === "user"){
  res.redirect('/');
  const token = jwt.sign({ userId: existingUser.id, email: existingUser.email, role: existingUser.role, name: existingUser.name  }, JWT_SECRET, { expiresIn: "2 days" });
}

console.log(token);
  
};
