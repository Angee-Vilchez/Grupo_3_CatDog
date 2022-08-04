/* const { decodeBase64 } = require('bcryptjs'); */
const { products, categories } = require('../data'); 
const db = require('../database/models');

const Products = db.Product;
const Categories = db.Category;

module.exports = {
   /*  mostrar: (req, res) => res.render('products/productdetail', {
        titulo: "Detalle de Producto",
        session: req.session
    }), */
    /* detail: (req, res) => {
        let productId = +req.params.id;
        let product = products.find(product => product.id === productId);
        res.render("products/productdetail", {
            css: "productdetail.css",
            titulo: "Detalle de producto",
            product,
            session: req.session

        })
    },   */
    detail:  (req, res) => {
        db.Product.findByPk(req.params.id)
        .then(product => {
            res.render("products/productdetail", {
                title: "detalle",
                product,
                session: req.session
            })
        })
        .catch((error)=> res.send(error))
    },

   

    
}
