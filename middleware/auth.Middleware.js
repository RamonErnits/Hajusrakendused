const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
require ('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET,async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        console.log(err.message);
        res.redirect('/login');
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        console.log(user.role);
        console.log(decodedToken);
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
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        console.log(token);
        next();
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
                let user = await User.findById(decodedToken.id);
                if (user.role === 'admin') {
                    res.locals.user = user;
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


module.exports = { requireAuth, checkUser };