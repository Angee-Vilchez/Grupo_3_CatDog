const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
//Controller
const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/admin/adminProductsController');
const adminCategoriesController = require('../controllers/admin/adminCategoriesController');
//middlewares
const adminCheck = require('../middlewares/adminCheck');
const uploadFile = require('../middlewares/uploadProduct');
const userSession = require('../middlewares/userSession');
//validations
const productCreateValidator = require('../validations/productCreateValidator');
const productEditValidator = require('../validations/productEditValidator');
const categoryValidator = require('../validations/categoryValidator');


/* Session */
router.get('/', userSession, adminCheck, adminController.index);

/* CRUD DE PRODUCTOS */
// Vista lista de productos
router.get('/productos', userSession, adminCheck, adminProductsController.list);
// Vista creacion de producto
router.get('/productos/agregar', userSession, adminCheck, adminProductsController.productAdd);
// CREAR PRODUCTO y guardar en DB
router.post('/productos',uploadFile.single('image'), productCreateValidator, adminProductsController.productCreate);
// Vista editar producto
router.get('/productos/editar/:id', userSession, adminCheck,  adminProductsController.productEdit);
// Editar producto y guardar en la DB
router.put('/productos/:id',uploadFile.single('image'), productEditValidator, adminProductsController.productUpdate);
// Eliminar producto
router.delete('/productos/eliminar/:id', adminProductsController.productDelete);



/* CRUD CATEGORIES */

router.get('/categorias', userSession, adminCheck, adminCategoriesController.list)

router.get('/categorias/agregar',userSession, adminCheck,  adminCategoriesController.categoryAdd)

router.post('/categorias',categoryValidator, adminCategoriesController.categoryCreate)

router.get('/categorias/editar/:id', userSession, adminCheck, adminCategoriesController.categoryEdit)

router.put('/categorias/:id',categoryValidator, adminCategoriesController.categoryUpdate)

router.delete('/categorias/eliminar/:id', adminCategoriesController.categoryDelete)

module.exports = router;