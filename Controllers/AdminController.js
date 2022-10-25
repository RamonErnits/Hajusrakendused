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



exports.getAdminPage = (req, res) => {
    res.render('admin'); 
};
  
exports.getAccountsPage = (req, res) => {
    res.render('accounts');
};

exports.getTasksPage = (req, res) => {
    res.render('tasks');
};

exports.getCustomersPage = (req, res) => {
    res.render('customers');
};
