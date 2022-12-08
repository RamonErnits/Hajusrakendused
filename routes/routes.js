const car = require('../Controllers/CarController');
const mainController = require("../controllers/mainController");
const adminController = require("../controllers/adminController");
const loginController = require("../controllers/loginController");
const registerController = require('../controllers/registerController');
const { requireAuth, checkUser, checkAdmin } = require('../middleware/auth.Middleware');
const User = require('../Models/userModel');

module.exports = function (app) {
    app.route('/cars')
        .get(car.getAllCars)
        .post(car.createNew);           //Create

    app.route('/cars/:id')
        .get(car.getCar)            //Read
        // .put(car.editCar)            //Update
        .delete(car.deleteCar);         //Delete

    app.route('/cars/update/:id')
        .post(car.editCar);                 //Update

    app.route('/users')
        .get(mainController.getAllUsers)    //Get Users

    app.route('/users/:id')
        .get(mainController.getUsersById)    //Get User by ID
        // .post(mainController.EditUser)       //Edit User
        .delete(mainController.deleteUser); //Delete User
    
    app.route('/users/update/:id')
        .post(mainController.EditUser);       //Edit User

    app.route('/register')
        .get(registerController.getRegisterPage)
        .post(registerController.postRegister);


    app.route('/login', function(res) {
        res.render('login', {title: ""})})
        .get(loginController.getLoginPage)
        .post(loginController.postLogin);
        

    app.route('/logout')
        .get(mainController.logout_get)

    app.get('/', checkUser, requireAuth, function (req, res) {
        res.render('index', { title: 'Home' });
    });

    app.route('/test')
    .get(mainController.getTestPage)

    app.get('/admin', checkAdmin, requireAuth, checkUser, function (req, res) {
        res.render('admin', { title: 'Admin' });
    });

    app.get('/edit', checkAdmin, requireAuth, checkUser, function (req, res) {
        res.render('edit', { title: 'Admin' });
    });

    app.get('/accounts', checkAdmin, requireAuth, checkUser, function (req, res) {
        res.render('accounts', { title: 'Admin' });
    });

    app.get('/admin/tasks', checkAdmin, requireAuth, checkUser, function (req, res) {
        res.render('tasks', { title: 'Admin' });
    });

    app.get('/admin/customers', checkAdmin, requireAuth, checkUser, function (req, res) {
        res.render('customers', { title: 'Admin' });
    });


    app.get('/sellers', checkUser, requireAuth, function (req, res) {
        res.render('sellers', { title: 'Home' });
    });

    app.get('/locations', checkUser, requireAuth, function (req, res) {
        res.render('locations', { title: 'Home' });
    });

    app.get('/post', checkUser, requireAuth, function (req, res) {
        res.render('post', { title: 'Home' });
    });

    app.get('/myposts', checkUser, requireAuth, function (req, res) {
        res.render('myposts', { title: 'Home' });
    });

    app.route("/logout")
        .get(mainController.logout_get);
}