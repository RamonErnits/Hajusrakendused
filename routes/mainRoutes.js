const mainController = require("../controllers/mainController");
const { requireAuth, checkUser, checkAdmin } = require('../middleware/auth.Middleware');
const express = require("express");
const router = express.Router();
 module.exports = function (app) {

   app.route("/logout")
   .get(mainController.logout_get)


   app.get('/admin', checkAdmin, (req, res) => res.render('admin'));

 }