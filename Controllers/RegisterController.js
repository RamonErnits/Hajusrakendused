require('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET
const bodyParser = require('body-parser');
const User = require("../Models/userModel");
const { request } = require('express');
const app = express();



exports.getRegisterPage = (req, res) => {
    res.render('register');
};


exports.postRegister = async (req, res, next) => {
    console.log("Register body: ", req.body);
    const { name, email, password, role } = req.body;
    const newUser = User({
        name,
        email,
        password,
        role,
    });

    try {
        await newUser.save();
    } catch (err) {
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




    res.redirect('/login')
};