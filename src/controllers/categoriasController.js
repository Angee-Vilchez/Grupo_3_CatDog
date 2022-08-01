const { categories } = require('../data');
const db = require('../database/models');

module.exports = {
    listPerros: (req, res) => {
            res.render('Categories/listperros', {
                categories,
                titulo: Perros,
                session: req.session
            })
        }
    }
