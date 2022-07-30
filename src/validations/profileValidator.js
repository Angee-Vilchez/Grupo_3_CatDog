const { check } = require('express-validator');


let validateProfile = [
    check("name")
        .notEmpty().withMessage("El nombre es requerido").bail()
        .isLength({ min: 2 }).withMessage("Ingrese un nombre válido"),
    check("userName")
        .notEmpty().withMessage("Debe ingresar su apellido").bail()
        .isLength({ min: 2 }).withMessage("Ingrese un apellido válido"),
    check("image")
        .custom((value, { req }) => {
            let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
            if (!req.file) {
                return true
            } if (!allowedExtensions.exec(req.file.filename)) {
                return Promise.reject('Solo archivos con estas extensiones .jpeg/.jpg/.png/.gif')
            } else {
                return true
            }
        })
];

module.exports = validateProfile;