const { check } = require('express-validator');

module.exports = [
    check('name')
        .notEmpty()
        .withMessage('campo requerido').bail(),
]