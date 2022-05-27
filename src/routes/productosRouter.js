const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');


//Vista que muestra un listado de todos los productos, con filtros.
router.get('/', productosController.mostrar);
router.get('/detalle/:id', productosController.detail);




module.exports = router;