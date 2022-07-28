const { check, body } = require('express-validator');
const db = require('../database/models');

let validateEditProduct = [
    check("name")
        .notEmpty().withMessage("El nombre es requerido").bail()
        .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres"),
    check("price")
        .notEmpty().withMessage("Ingresa un precio").bail()
        .isNumeric().withMessage("Sólo números"),
    check("categoryId")
        .notEmpty().withMessage("Selecciona una categoría"),
    check("description")
        .notEmpty().withMessage("Agrega una descripcion").bail()
        .isLength({ min: 20 }).withMessage("Debe tener al menos 5 caracteres"),
    check("brands")
        .notEmpty().withMessage("Agrega una marca"),
    body("discount").custom(value => {
        if (value >= 0 && value <= 100) {
            return true;
        }
        return false;
    }).withMessage("El descuento tiene que tener un valor entre 0 y 100"),

    check("image")
        .custom((value, { req }) => {
            let extencionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
            if (!req.file) {
                return true
            } if (!extencionesPermitidas.exec(req.file.filename)) {
                return Promise.reject('Solo archivos con estas extensiones .jpeg/.jpg/.png/.gif')
            } else {
                return true
            }
        })
]

module.exports = validateEditProduct;