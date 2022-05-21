const cookieSession = (req, res, next) => {
        if(req.cookies.catdogCookie){
            req.session.user = req.cookies.catdogCookie;
            res.locals.user = req.session.user; 
        }
        next()
    
}
module.exports = cookieSession;