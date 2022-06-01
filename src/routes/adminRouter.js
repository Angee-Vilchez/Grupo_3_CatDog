const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/adminProductsController');
const adminCheck = require('../middlewares/adminCheck');
const uploadFile = require('../middlewares/uploadProduct');
const userSession = require('../middlewares/userSession');

/* Session */
router.get('/', adminController.index);

/* CRUD DE PRODUCTOS */
/* GET - LISTADO DE PRODUCTOS */
router.get('/productos',  adminProductsController.list);
/* GET - CREACION DE PRODUCTO */
router.get('/productos/agregar', adminProductsController.productAdd);
/* POST - CREAR PRODUCTO */
router.post('/productos',uploadFile.single('image'), adminProductsController.productCreate);
/* GET - EDITAR PRODUCTO */
router.get('/productos/editar/id',  adminProductsController.productEdit);
/* PUT - ACTUALIZAR PRODUCTO */
router.put('/productos/:id',uploadFile.single('image'), adminProductsController.productUpdate);
/* DELETE - ELIMIAR UN PRODUCTO */
router.delete('/productos/eliminar/:id', adminProductsController.productDelete);

module.exports = router;