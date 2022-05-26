const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);
router.get('/contacto', indexController.contacto);
router.get('/detail/:id', indexController.detail);

module.exports = router;