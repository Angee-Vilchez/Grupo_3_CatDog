const { products } = require('../data');

module.exports = {
    index: (req, res) => {
    res.render('index', {
        titulo: "CatDog",
        products,
        session: req.session
    })
},
    contacto: (req, res) => res.send("CONTACTO"),
     
};