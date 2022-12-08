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

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  if (err.message === 'incorrect email') {
    errors.email = 'Incorrect email or password';
  }

  if (err.message === 'incorrect password') {
    errors.password = 'Incorrect email or password';
  }

  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }


  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {

      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


exports.postLogin = async (req, res, next) => { 
  
  const { name, role, email, password } = req.body;
    
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email, role: role });
  } catch {
     return res.status(400).json((err))
     
  }
  

  if (!existingUser || !await bcrypt.compare(req.body.password,existingUser.password)) {
    return res.status(400).json((err));
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
  res.redirect('/');
  const token = jwt.sign({ userId: existingUser.id, email: existingUser.email, role: existingUser.role, name: existingUser.name  }, JWT_SECRET, { expiresIn: "2 days" });
}


if(role === "user"){
  res.redirect('/');
  const token = jwt.sign({ userId: existingUser.id, email: existingUser.email, role: existingUser.role, name: existingUser.name  }, JWT_SECRET, { expiresIn: "2 days" });
}

console.log(token);
  
};
