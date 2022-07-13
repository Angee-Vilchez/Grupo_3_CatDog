const { check } = require('express-validator');


let validateProfile = [
    check("name")
        .notEmpty().withMessage("El nombre es requerido").bail()
        .isLength({min: 2}).withMessage("Ingrese un nombre válido"),
    check("userName")
        .notEmpty().withMessage("Debe ingresar su apellido").bail()
        .isLength({min: 2}).withMessage("Ingrese un apellido válido"),
    check("phone")
        .notEmpty().withMessage("Ingrese un teléfono"),
];

module.exports = validateProfile;