const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');


/* Categorias Perros */
router.get('/listperros', categoriasController.listPerros);

module.exports = router;