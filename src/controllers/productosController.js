const { products } = require('../data');
const db = require("../database/models")

module.exports = {
    mostrar:(req, res) => {
        db.Product.findAll()
        .then((products)=>{
        res.render('products/productdetail', {
        titulo: "Detalle de Producto",
        session: req.session,
        products
         });
    })
    .catch((error)=>res.send(error))
    },
    detail: (req, res) => {
        let productId = +req.params.id;
        let product = products.find(product => product.id === productId);
        res.render("products/productdetail", {
            css: "productdetail.css",
            titulo:"Detalle de producto",
            product,
            session: req.session
            
        })
       },
};