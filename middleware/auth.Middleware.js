const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        console.log(err.message);
        res.redirect('/login');
      } else {
        let user = await User.findById(decodedToken.id);
        let role = decodedToken.role;
        let name = decodedToken.name;
        res.locals.user = user;
        res.locals.token = token;
        res.locals.name = name;
       
        console.log("requireAuth = ",decodedToken)
        next();

      }
    });
  } else {
    res.redirect('/login');
  }
};


const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        console.log(token);
        next();
      } else {
        let role = decodedToken.role;
        let user = await User.findById(decodedToken.id);
        let name = decodedToken.name;
        if (role === 'user' || role === 'admin') {
          res.locals.user = user;
          res.locals.token = token;
          res.locals.role = role;
          res.locals.name = name;
          next();
          if (role === 'admin') {
            console.log("Logged In As: "+role);
          } else {
            console.log("Logged In As: "+role);
          }
        } else {
          res.redirect('/login');
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let role = decodedToken.role;
        let name = decodedToken.name;
        let user = await User.findById(decodedToken.id);
        if (role === 'admin') {
          res.locals.user = user;
          res.locals.token = token;
          res.locals.role = role;
          res.locals.name = name;
          next();
        } else {
          res.redirect('/login');
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser, checkAdmin };
