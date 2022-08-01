const { categories } = require('../data');
const db = require('../database/models');

module.exports = {
    listPerros: (req, res) => {
        db.Category.findAll()
            .then((categorias) => {
                res.render('Categories/listperros', {
                    titulo: "Categorías",
                    categorias,
                    session: req.session
                });
            })
            .catch((error) => console.log(error));
    },
    }
