const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

router.get('/carrito', carritoController.mostrar);

module.exports = router;