const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/userController');
//validations
const loginValidator = require('../validations/loginValidator');
const registerValidator = require("../validations/registerValidator");
//middlewares
const userInSessionCheck = require("../middlewares/userInSessionCheck");
const uploadFile = require("../middlewares/uploadAvatar");


//rutas login
router.get('/login', userInSessionCheck, usersControllers.login);
router.post('/login', loginValidator, usersControllers.processLogin);
router.get('/logout', usersControllers.logout);


//rutas registro
router.get("/register", userInSessionCheck, usersControllers.register);
router.post("/register", uploadFile.single('avatar'), registerValidator, usersControllers.processRegister);


module.exports = router;