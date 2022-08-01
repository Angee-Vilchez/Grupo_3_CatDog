const adminCheck = (req, res, next) => {
    if (req.session.user.rol === 2){
        next()
    }else{
        res.send("No tenes permiso de administrador") 
    }
}

module.exports = adminCheck;