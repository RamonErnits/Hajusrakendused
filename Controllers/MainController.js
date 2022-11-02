require ('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET
const bodyParser = require('body-parser');

const { request } = require('express');
const app = express();




exports.getIndexPage = (req, res) => {
  const token = req.cookies.jwt;
  console.log("token" + token);
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




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/login');
}







