const { validationResult } = require('express-validator');
const db = require("../../database/models");

module.exports = {

    //Envia la vista de listado de productos
    list: (req, res) => {
        db.Product.findAll()
            .then((products) => {
                res.render('admin/listproduct', {
                    titulo: "Lista productos",
                    productos: products,
                    session: req.session
                });
            })
            .catch((error) => res.send(error))
    },
    //Envia la vista de formulario de la creacion de producto
    productAdd: (req, res) => {
        db.Category.findAll()
        .then((categories) => {
        res.render('admin/addproduct', {
            titulo: "Agregar producto",
            session: req.session,
            categories
        })
      })
      /* .catch(err => res.send) */.catch((error) => res.send(error))
    },
    //Recibe los datos del form de la creacion y lo guarda en la DB
    productCreate: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Product.create({
                name: req.body.name,
                marca: req.params.marca,
                price: req.body.price,
                discount: req.body.discount,
                category_id: req.body.categoryId,
                description: req.body.description,
                image: req.file ? req.file.filename : "default-image.png",
                brands: req.body.brands,
                stock: req.body.stock ? true : false
            })
                .then(() => {
                    res.redirect('/admin/productos')
                })
                .catch((error) => res.send(error))
        } else {
            res.render('admin/addproduct', {
                titulo: "Agregar producto",
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    //vista de edicion de producto
    productEdit: (req, res) => {
        let idProducto = +req.params.id;
        db.Product.findByPk(idProducto)
            .then((products) => {
                res.render('admin/editproduct', {
                    titulo: "Edición",
                    producto: products,
                    session: req.session
                })
            })
            .catch((error) => res.send(error))
    },
    //Recibe datos actualizados del form de edicion y guarda en la DB
    productUpdate: (req, res) => {
        let errors = validationResult(req);
        
    if(errors.isEmpty ()){
        db.Product.update({
            name: req.body.name,
            marca: req.body.marca,
            price: req.body.price,
            discount: req.body.discount,
            category_id: req.body.categoryId,
            description: req.body.description,
            image: req.file ? req.file.filename : "default-image.png",
            brands: req.body.brands,
            stock: req.body.stock ? true : false
        },
        {
            where:{
                id:req.params.id,
            }
        })
        .then(()=>{
        res.redirect('/admin/productos');
        })
        .catch((error) => res.send(error))
    } else {
        db.Product.findOne({
        where:{
            id:req.params.id,
        }
    })
    .then((producto)=>{
        res.render('admin/editproduct', {
            titulo: "Editar:",
            producto,
            session: req.session,
            errors: errors.mapped(),
            old: req.body
        })
    })
    .catch((error) => res.send(error))
    }
    },   
    /* Recibe la info del producto a eliminar */
    productDelete: (req, res) => {
        let idProducto = +req.params.id;
        db.Product.destroy({ where:{
        id: idProducto }})
        .then((result) => {
            if(result){
                res.redirect('/admin/productos')
            }else{
              res.send('Hay un error')
            }
        })
        .catch((error) => res.send(error)); 
        }
}