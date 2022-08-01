const { products, categories } = require('../data'); 
const db = require('../database/models');
const { Op } = db.Sequelize.Op; 

module.exports = {
    index: (req, res) => {
        res.render('index', {
            titulo: "CatDog",
            products,
            session: req.session
        })
    },
    contacto: (req, res) => res.send("CONTACTO"),

    /* search: (req, res) => {
		    res.render('result', {
			titulo: 'Resultados',
            products,
            css: 'result.css',
			keyword: req.query.keywords,
            session: req.session
		})
	}, */

    search: (req, res) => { 

        let buscado = req.query.Busqueda;

        db.Product.findAll({
            where: {
                name: {
                    [Op.substring]: buscado
                }
            },
            include: [{ association: "productImages" }]
        })
        .then(productos => {
            res.render('search', {
                products, 
                busqueda: req.query.Busqueda,
                session: req.session
            })
        })
        .catch(error => res.send(error));
    },

    terminosycondiciones: (req, res) => {
        res.render('terminosycondiciones', {
            titulo: "Terminos-y-Condiciones",
            session: req.session
        })
    },

    cambiosydevoluciones: (req, res) => {
        res.render('cambiosydevoluciones', {
            titulo: "Cambios-y-Devoluciónes",
            session: req.session
        })
    },

    quienessomos: (req, res) => {
        res.render('quienessomos', {
            titulo: "Quienes-Somos",
            session: req.session
        })
    },

    comocomprar: (req, res) => {
        res.render('comocomprar', {
            titulo: "Como-Comprar",
            session: req.session
        })
    },

    zonasdeentrega: (req, res) => {
        res.render('zonasdeentrega', {
            titulo: "Zona-De-Entrega",
            session: req.session
        })
    },
}