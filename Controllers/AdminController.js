require ('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET
const bodyParser = require('body-parser');

const { request } = require('express');
const app = express();




// Exports -------------------------------------------------------

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

exports.getIndexAdminPage = (req, res) => {
    res.render('indexAdmin'); 
};



