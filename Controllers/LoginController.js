require ('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET
const bodyParser = require('body-parser');
const User = require("../Models/userModel");
const { request } = require('express');
const app = express();


exports.getLoginPage = (req, res) => {
    res.render('login');
};
exports.postLogin = async (req, res, next) => { 
  
  let { role, email, password } = req.body;
    
  let existingUser;
  
  try {
    existingUser = await User.findOne({ email: email, role: role });
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
      { expiresIn: "2 days" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  
  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      token: token,
    },
  });
  

  console.log(token);
};

