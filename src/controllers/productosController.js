const { products } = require('../data');

module.exports = {
    mostrar: (req, res) => res.render('products/productdetail', {
        titulo: "Detalle de Producto",
        session: req.session
    }),
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
  productCart: (req,res) => {
       res.render('views/productCart', {
             session: req.session,
        })
  },
};