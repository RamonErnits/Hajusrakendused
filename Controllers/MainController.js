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



exports.register = async (req, res, next) => {
  const { username, password } = req.body;


  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      username,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, username, role: user.role },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs in sec
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(201).json({
          message: "User successfully created",
          user: user._id,
        });
      })
      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      );
  });
};




