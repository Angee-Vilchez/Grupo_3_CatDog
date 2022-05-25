const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const userProductsController = require('../controllers/userProductsController');

router.get('/', productosController.mostrar);
router.get('/detail/:id', userProductsController.detail);



module.exports = router;