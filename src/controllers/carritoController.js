
module.exports = {
    mostrar:(req, res) => {
        res.render('productCart', {
        titulo: "Carrito",
        session: req.session,
    })
}
};