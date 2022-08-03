const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');


/* Categorias */
router.get('/category/:id', categoriasController.category);

router.get('/subcategory/:subcategory/:categoryId', categoriasController.subcategory)

module.exports = router;