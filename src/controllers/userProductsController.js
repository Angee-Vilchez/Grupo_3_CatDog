const { products } = require('../data');

module.exports = {
    list: (req, res) => {
        res.render("products/products", {
            products,
            titulo:"Productos",
            css: "products.css",
            session: req.session
        })
    },
};