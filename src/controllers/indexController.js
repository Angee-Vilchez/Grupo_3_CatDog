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
     
    search: (req,res)  => {
		let search = req.query.keywords;
        let searchProduct = search;
    
            res.render('result',{
                products,
				keyword: req.query.keywords,
                session:req.session
                })
                
        .catch((error) => { res.send(error)})
},
}