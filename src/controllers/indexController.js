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
}