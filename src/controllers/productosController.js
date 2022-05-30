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
    detail: (req, res) => {
        let productId = +req.params.id;
        let product = products.find(product => product.id === productId);
        res.render("products/productdetail", {
            css: "productdetail.css",
            titulo:"Detalle de producto",
            session: req.session,
            products
        })
       },
       edit: (req, res) => {
           let productId = +req.params.id;
           let product = products.find(product => products.id === productId);

            res.render('admin/editproduct', {
                product
            })
       },

       addEdit: (req, res) => {
           let productId = +req.params.id;

           products.forEach(product => {
               if(product.id === productId){
                   product.name = req.body.name
                   product.price = req.body.price
                   product.description = req.body.description
               }
           })

           writeProducts(products)

           res.send('Modificaste el producto Exitosamente!')
       },

       delete: (req,res)  => {
        let productId = +req.params.id;
        let productToDelete;

        products.forEach(product => {
             if(product.id === productId){
                  productToDelete = product.name
                  let productToDeleteIndex = products.indexOf(product);
                  products.splice(productToDeleteIndex, 1);
             }
        });
        
        writeProducts(products)

        res.send('Eliminaste el producto')
  },

  productCart: (req,res) => {
       res.render('views/productCart', {
             session: req.session,
        })
  }
}