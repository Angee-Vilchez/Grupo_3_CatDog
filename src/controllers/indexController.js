const fs = require('fs');
const path = require('path');
const { products } = require('../data');

const db = require('../database/models');
const {Op} = require("sequelize");
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

module.exports = {
    index: (req, res) => {
        res.render('index', {
            titulo: "CatDog",
            products,
            session: req.session
        })
    },
    contacto: (req, res) => res.send("CONTACTO"),

    /*  search: (req, res) => {
             res.render('result', {
             titulo: 'Resultados',
             products,
             css: 'result.css',
             search: req.query.keywords,
             session: req.session
         })
     },  */

    search: (req, res) => {
        let searchResult = req.query.keywords;
        let search = removeAccents(searchResult.toLowerCase())
        db.Product.findAll({
            where: {
                name: { [Op.like]: `%${search}%` }
            }
        })
            .then(products => {
                res.render('result', {
                    products,
                    keyword: req.query.keywords,
                    session: req.session
                })
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
    formasdepago: (req, res) => {
        res.render('formasdepago', {
            titulo: "Formas-de-pago",
            session: req.session
        })
    },

    vistaPerros: (req,res)  => {
        db.Product.findAll({
             include: [
               {association: "categories" },
             ],
             where: [
                  {category_id: 1}
             ]
            })
             .then(products => {
                  res.render('products/vistaperros', {
                       products,
                       session: req.session,
                  })
            })
            .catch((error) => { res.send(error)})
        
       },
       vistaGatos: (req,res)  => {
        db.Product.findAll({
             include: [
               {association: "categories" },
             ],
             where: [
                  {category_id: 2}
             ]
            })
             .then(products => {
                  res.render('products/vistaGatos', {
                       products,
                       session: req.session,
                  })
            })
            .catch((error) => { res.send(error)})
        
       },
       vistaAccesorios: (req,res)  => {
        db.Product.findAll({
             include: [
               {association: "categories" },
             ],
             where: [
                  {category_id: 3}
             ]
            })
             .then(products => {
                  res.render('products/vistaAccesorios', {
                       products,
                       session: req.session,
                  })
            })
            .catch((error) => { res.send(error)})
        
       },
       vistaOtros: (req,res)  => {
        db.Product.findAll({
             include: [
               {association: "categories" },
             ],
             where: [
                  {category_id: 4}
             ]
            })
             .then(products => {
                  res.render('products/vistaOtros', {
                       products,
                       session: req.session,
                  })
            })
            .catch((error) => { res.send(error)})
        
       },
}