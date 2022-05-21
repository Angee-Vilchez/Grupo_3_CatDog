const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController')
const adminProductsController = require('../controllers/admin/adminProductsController');
const userProductsController = require('../controllers/userProductsController');
const adminCheck = require('../middlewares/adminCheck')

/* Session */
router.get('/', adminController.index);

/* CRUD DE PRODUCTOS */
/* GET - LISTADO DE PRODUCTOS */
router.get('/productos', adminProductsController.list);
/* GET - CREACION DE PRODUCTO */
router.get('/productos/agregar', adminProductsController.productAdd);
/* POST - CREAR PRODUCTO */
router.post('/productos', adminProductsController.productCreate);
/* GET - EDITAR PRODUCTO */
router.get('/productos/editar/:id', adminProductsController.productEdit);
/* PUT - ACTUALIZAR PRODUCTO */
router.put('/productos/:id', adminProductsController.productUpdate);
/* DELETE - ELIMIAR UN PRODUCTO */
router.delete('/productos/eliminar/:id', adminProductsController.productDelete);

module.exports = router;