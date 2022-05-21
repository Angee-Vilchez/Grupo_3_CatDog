const{check, body} = require("express-validator");
const {users}= require('../data');

let validateRegister = [
    check("name")
        .notEmpty().withMessage("Debe ingresar su nombre").bail()
        .isLength({max: 15}).withMessage("Ingrese el nombre, sin espacios"),

    check("surname")
        .notEmpty().withMessage("Debe ingresar su apellido").bail()
        .isLength({max: 15}).withMessage("Ingrese su apellido, sin espacios"),

    check("email")
        .notEmpty().withMessage("El email es requerido").bail()
        .isEmail().withMessage("Ingrese un email válido"),
    body("email").custom(value=>{
        let user = users.find(user => user.email === value);
        if(user){
            return false;
        }
        return true;
    }).withMessage("El email ya se encuentra registrado"),
    check("password")
                .notEmpty().withMessage("Debe ingresar la contraseña")
                .isLength({min:3}).withMessage("Debe tener como mínimo 3 carácteres"),
    
    check("password2")
                .notEmpty().withMessage("Debe reingresar su contraseña"),

    body("password2").custom((value, {req})=>{
        if(value !== req.body.password){
            return false;
        }
        return true;
    }).withMessage("Las contraseñas deben coincidir"),

    check("terms")
                .isString("on").withMessage("Debes aceptar los términos y condiciones")
];

module.exports = validateRegister;