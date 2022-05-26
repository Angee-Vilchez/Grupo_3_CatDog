const { products } = require('../data');

module.exports = {
    index: (req, res) =>
    res.render('index', {
        titulo: "CatDog",
        products,
        session: req.session
    }),
    contacto: (req, res) => res.send("CONTACTO"),
     
    detail: (req, res) => {
        let productId = +req.params.id;
        let products = products.find(product => product.id === productId);
        res.render("products/productdetail", {
            css: "productdetail.css",
            titulo:"Detalle de producto",
            session: req.session,
            products,
        })
       },
}