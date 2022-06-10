const userSession = (req, res, next) => {
    if(req.session.user){
        next()
    }else{
        res.redirect('/usuarios/login')
    }
}

module.exports = userSession;