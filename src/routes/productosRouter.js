const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');


/* Todos los productos */
router.get('/', productosController.mostrar);

/* Detalle de Productos */
router.get('/detalle/:id', productosController.detail);

router.get('/listPerros', productosController.listPerro);


module.exports = router;