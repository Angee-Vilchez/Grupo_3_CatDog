const { check, body } = require("express-validator");
const db = require('../database/models');

let validateRegister = [
    check("name")
        .notEmpty().withMessage("Debe ingresar su nombre").bail()
        .isLength({ min: 2 }).withMessage("Ingrese un nombre válido"),

    check("userName")
        .notEmpty().withMessage("Debe ingresar su apellido").bail()
        .isLength({ min: 2 }).withMessage("Ingrese un apellido válido"),

    check("email")
        .notEmpty().withMessage("El email es requerido").bail()
        .isEmail().withMessage("Ingrese un email válido"),
    body("email").custom((value) => {
        return db.User.findOne({
            where: {
                email: value,
            }
        })
            .then((user) => {
                if (user) {
                    return Promise.reject("Email ya registrado")
                }
            })
    }),
    check("password")
        .notEmpty().withMessage("Debe ingresar la contraseña")
        .isLength({ min: 8 }).withMessage("Debe tener como mínimo 8 carácteres")
        .isAlphanumeric().withMessage("La contraseña debe tener números y letras"),

    check("password2")
        .notEmpty().withMessage("Debe reingresar su contraseña"),

    body("password2").custom((value, { req }) => {
        if (value !== req.body.password) {
            return false;
        }
        return true;
    }).withMessage("Las contraseñas deben coincidir"),

    check("terms")
        .isString("on").withMessage("Debes aceptar los términos y condiciones")
];

module.exports = validateRegister;