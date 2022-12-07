require ('dotenv').config();
const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET
const bodyParser = require('body-parser');
const User = require("../Models/userModel");
const { request } = require('express');
const app = express();


exports.getAllUsers = async (req, res) => {
    const user = await User.find();
    res.status(200).json({
        success: true,
        data: user,
    });
};

exports.getUsersById = async (req, res) => {
  const user = await User.findById(req.params.id);
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.json(user)
};

exports.EditUser = async (req, res) => {
    User.updateOne({ _id: req.params.id }, { $set: { name: req.body.name, email: req.body.email, password: req.body.password, role: req.body.role } })
        .then(result => {
            res.status(200).json({
                success: true,
                data: result,
            });
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                data: err,
            });
        });
};

exports.deleteUser = async (req, res) => {
    user.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                success: true,
                data: result,
            });
        })
        .catch(err => {
            res.status(400).json({
                success: false,
                data: err,
            });
        });
};


exports.getMyPostsPage = (req, res) => {
    res.render('myposts');
};

exports.getTestPage = (req, res) => {
  res.render('testindex')
}



exports.getIndexPage = (req, res) => {
  const token = req.cookies.jwt;
  console.log("token: " + token);
  res.render('index');

};

exports.getPostPage = (req, res) => {
  res.render('post');
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
  const { name, password } = req.body;


  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      name,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          { id: user._id, name, role: user.role },
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




