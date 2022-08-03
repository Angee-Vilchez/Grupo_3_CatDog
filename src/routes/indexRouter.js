const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.index);
router.get('/contacto', indexController.contacto);
router.get('/search', indexController.search);
router.get('/TerminosyCondiciones', indexController.terminosycondiciones);
router.get('/CambiosyDevoluciones', indexController.cambiosydevoluciones);
router.get('/QuienesSomos', indexController.quienessomos);
router.get('/ComoComprar', indexController.comocomprar);
router.get('/ZonasdeEntrega', indexController.zonasdeentrega);
router.get('/FormasdePago', indexController.formasdepago);

module.exports = router;