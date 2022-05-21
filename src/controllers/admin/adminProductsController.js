const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeProducts = (data) => fs.writeFileSync(productsFilePath, JSON.stringify(data), 'utf-8')
/* const { products, writeProducts, getProducts } = require('../../data');
const { validationResult } = require('express-validator');  */

module.exports = {

    //Muestra la lista de productos
    list: (req, res) => {
        res.render('admin/listproduct', {
            productos: products
        })
    },
    //Envia la vista de formulario de la creacion de producto
    productAdd: (req, res) => {
        res.render('admin/addproduct')
    },
    //Recibe los datos del form de la creacion y lo guarda en la DB
    productCreate: (req, res) => {
        let errors = validationResult(req);
       
        if(errors.isEmpty()){
            /* 1 - Crear el objeto producto */
            let lastId = 0;
            products.forEach(product => {
                if(product.id > lastId){
                    lastId = product.id;
                }
            });

            let newProduct = {
                ...req.body, 
                id: lastId + 1,
                image: req.file ? req.file.filename : "default-image.png",
                stock: req.body.stock ? true : false
            }
            
            // Paso 2 - Guardar el nuevo producto en el array de usuarios

            products.push(newProduct)

            // Paso 3 - Escribir el JSON de productos con el array actual

            writeProducts(products)

            // Paso 4 - Devolver respuesta (redirección)

            res.redirect('/admin/productos')
        }else{
            res.render('admin/products/addProduct', {
                titulo: "Agregar producto",
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    //edicion de producto
    productEdit: (req, res) => {

        let idProducto = +req.params.id;

        let producto = getProducts.find(producto => producto.id === idProducto)

        res.render('admin/editproduct', {
            titulo: "Edición",
            producto,
        })
    },
    //Recibe datos actualizados del form de edicion
    productUpdate: (req, res) => {
        /* 1 - Obtener el id del producto */
        let idProducto = +req.params.id;
        /* 2 - Buscar el producto a editar y modificar el producto */
        products.forEach(producto => {
            if(producto.id === idProducto){
                producto.name = req.body.name
                producto.price = req.body.price
                producto.discount = req.body.discount
                producto.categoryId = req.body.categoryId
                producto.projectId = req.body.projectId
                producto.stock = req.body.stock ? true : false
                producto.description = req.body.description
            }
        })

        /* 3 - Guardar los cambios */
        writeProducts(products);

        /* 4 - Respuesta */
        res.redirect('/admin/productos');
    },
    /* Recibe la info del producto a eliminar */
    productDelete: (req, res) => {
        /* 1 - Obtener el id del producto a eliminar */
        let idProducto = +req.params.id;
        /* 2 - Buscar el producto dentro del array y eliminarlo */
        products.forEach(producto => {
            if(producto.id === idProducto){
                //Obtener la ubicación (índice) del producto a eliminar
                let productToDeleteIndex = products.indexOf(producto);
                //Elimino el producto del array
                products.splice(productToDeleteIndex, 1)
            }
        })
        /* 3 - Sobreescribir el json */
        writeProducts(products);
        /* 4 - Enviar respuesta  */
        res.redirect('/admin/productos')
    },

    productDelete: (req, res) => {     

        let idProducto = +req.params.id;

        products.forEach(producto => {
            if(producto.id === idProducto){  

                let productToDeleteIndex = getProducts.indexOf(producto); 

                getProducts.splice(productToDeleteIndex, 1)
            }
        });

        writeProducts(products);

        res.redirect('/admin/productos')

    },
}

