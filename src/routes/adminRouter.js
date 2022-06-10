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


/* Session */
router.get('/', adminController.index);

/* CRUD DE PRODUCTOS */
/* LISTADO DE PRODUCTOS */
router.get('/productos', /* userSession, adminCheck, */ adminProductsController.list);
/* CREACION DE PRODUCTO */
router.get('/productos/agregar', /* userSession, adminCheck, */ adminProductsController.productAdd);
/* CREAR PRODUCTO DB*/
router.post('/productos',uploadFile.single('img'), productCreateValidator, adminProductsController.productCreate);
/* EDITAR PRODUCTO */
router.get('/productos/editar/id', /* userSession, adminCheck, */  adminProductsController.productEdit);
/* ACTUALIZAR PRODUCTO DB */
router.put('/productos/:id',uploadFile.single('image'), productEditValidator, adminProductsController.productUpdate);
/* ELIMIAR UN PRODUCTO */
router.delete('/productos/eliminar/:id', adminProductsController.productDelete);



/* CRUD CATEGORIES */

router.get('/categorias', /*userSessionCheck, adminCheck */ adminCategoriesController.list)

router.get('/categorias/agregar', /* ,userSessionCheck, adminCheck */ adminCategoriesController.categoryAdd)

router.post('/categorias', adminCategoriesController.categoryCreate)

router.get('/categorias/editar/:id', /* userSessionCheck, adminCheck, */ adminCategoriesController.categoryEdit)

router.put('/categorias/:id', adminCategoriesController.categoryUpdate)

router.delete('/categorias/eliminar/:id', adminCategoriesController.categoryDelete)

module.exports = router;