const car = require('../Controllers/CarController');
const mainController = require("../controllers/mainController");
const adminController = require("../controllers/adminController");
const loginController = require("../controllers/loginController");
const registerController = require('../controllers/registerController');
const { requireAuth, checkUser, checkAdmin } = require('../middleware/auth.Middleware');
const User = require('../Models/userModel');

module.exports = function(app) {
    app.route('/cars')
        .get(car.getAll)
        .post(car.createNew);         //Create

    app.route('/cars/:id')
        .get(car.getById)            //Read
        .put(car.editById)            //Update
        .delete(car.deleteById);      //Delete


    app.route('/register')
    .get(registerController.getRegisterPage)
    .post(registerController.postRegister);


    app.route('/login')
    .get(loginController.getLoginPage)
    .post(loginController.postLogin);

    app.route('/logout')
    .get(mainController.logout_get)

    app.route('/index', checkUser)
    .get(mainController.getIndexPage);

    app.route('/index/admin')
    .get(adminController.getIndexAdminPage);

    app.route('/admin')
    .get(adminController.getAdminPage);

    app.route('/admin/accounts')
    .get(adminController.getAccountsPage);

    app.route('/admin/tasks')
    .get(adminController.getTasksPage);

    app.route('/admin/customers')
    .get(adminController.getCustomersPage);

    app.route('/sellers')
    .get(mainController.getSellersPage);

    app.route('/locations')
    .get(mainController.getLocationsPage);

    app.route('/post')
    .get(mainController.getPostPage);

    app.route('/myposts')
    .get(mainController.getMyPostsPage);

    // app.get('/admin', requireAuth, checkAdmin, (req, res) => res.render('admin'));
    // app.get('/index', requireAuth, checkUser, (req, res) => res.render('index'));


}