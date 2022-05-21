const { getUsers } = require("../data")

module.exports = {
    index: (req, res) => res.render('index', {
        titulo: "CatDog",
        session: req.session
    }),
    contacto: (req, res) => res.send("CONTACTO")
}