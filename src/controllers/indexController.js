const { products, categories } = require('../data'); 
const db = require('../database/models');
const { Op } = db.Sequelize; 




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
        let search = req.query.keywords;
        let searchProduct = search;

        db.Products.findAll({
            where: {
                name: { [Op.substring]: `%${searchProduct}%` }
            }
        })
            .then(products => {
                res.render('result', {
                    products,
                    keyword: req.query.keywords,
                    session: req.session
                })
            })
            .catch((error) => { res.send(error) })
    } */
    /* search: (req, res) => {
        db.products.findAll({
            where: {
                name: {
                    [Op.substring]: req.query.keywords
                }
            },
            include: [{association: 'productImages'}]
        })
        .then((result) => {
            res.render('result', {
                result,
                search: req.query.keywords,
                session: req.session
            })
        })
    } */
    /* search: (req, res) => {
        let products = [];
        db.Product.findAll({
            include : [{association : 'images'}],
            where: {name: {[Op.like]: '%' + req.query.keywords + '%'}}
        })
        .then((productos) => {
            db.Category.findAll()
            .then(categorias => {
                res.render('search',{
                    productos,
                    keyword: req.query.keywords,
                    title: 'Resultados',
                    session: req.session,
                    categorias,
                    products
                });
            })
            .catch(error => res.send(error));
        })
        .catch((error) => {res.send(error)});
    }, */

    search: (req, res) => {
		    res.render('result', {
			titulo: 'Resultados',
            products,
            css: 'result.css',
			keyword: req.query.keywords,
            session: req.session
		})
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