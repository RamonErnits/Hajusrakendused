const car = require('../Controllers/CarController');
const mainController = require("../controllers/mainController");
const adminController = require("../controllers/adminController");
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
    .get(mainController.getRegisterPage)
    .post(mainController.postRegister);
 
    app.route('/login')
    .get(mainController.getLoginPage)
    .post(mainController.postLogin);

    app.route('/index')
    .get(mainController.getIndexPage);

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

    app.route('/logout')
    .get(mainController.getLogout);

}