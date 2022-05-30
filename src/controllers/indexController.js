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
     
    search: (req, res) => {
        let searchResult = [];

        products.forEach(product => {
            if(removeAccents(products.name.toLowerCase()).includes(req.query.keywords.toLowerCase())){
                searcResult.push(products)
            }
        });

        res.render('result', {
            searchResult,
            keyword: req.query.keywords,
            products,
            session: req.session,
        });
    }
};