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
/* Buscador de productos */
router.get('/search', indexController.search);
/* Vista de Perros */
router.get('/perros', indexController.vistaPerros);
/* Vista de Gatos */
router.get('/gatos', indexController.vistaGatos);
/* Vista de Accesorios */
router.get('/accesorios', indexController.vistaAccesorios);
/* Vista de Otros */
router.get('/otros', indexController.vistaOtros);
module.exports = router;