const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeProducts = (data) =>  fs.writeFileSync(productsFilePath, JSON.stringify(data), "utf-8");

module.exports = {
    mostrar: (req, res) => res.render('products/productdetail', {
        titulo: "Detalle de Producto",
        session: req.session
    }),
}