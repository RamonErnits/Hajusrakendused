require ('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET
const bodyParser = require('body-parser');

const { request } = require('express');
const app = express();



exports.getAdminPage = (req, res) => {
   // declare role
    let role = req.body.role;
    res.locals.user = user;
    role === 'admin' ;
    res.render('admin');
};
  
exports.getAccountsPage = (req, res) => {
    res.render('accounts');
};

exports.getEditPage = (req, res) => {
    res.render('edit');
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



