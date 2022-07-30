const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/userController');
//validations
const loginValidator = require("../validations/loginValidator");
const registerValidator = require("../validations/registerValidator");
const profileValidator = require("../validations/profileValidator");
//middlewares
const userInSessionCheck = require("../middlewares/userInSessionCheck");
const userSession = require("../middlewares/userSession");
const uploadFile = require("../middlewares/uploadAvatar");



//rutas login
router.get('/login', userInSessionCheck, usersControllers.login);
router.post('/login', loginValidator, usersControllers.processLogin);
router.get('/logout', usersControllers.logout);


//rutas registro
router.get("/register", userInSessionCheck, usersControllers.register);
router.post("/register", uploadFile.single('avatar'), registerValidator, usersControllers.processRegister);


// rutas Perfil de usuario
router.get('/perfil', userSession, usersControllers.profile);
/* PUT - Edita datos de usuario */
router.put('/perfil', uploadFile.single('avatar'), profileValidator, usersControllers.profileUpdate);


//rutas Creación de dirección
/* POST - Creación de dirección */
router.post('/direcciones', usersControllers.addressCreate);
router.delete('/direcciones/:id', usersControllers.addressDestroy);


module.exports = router;