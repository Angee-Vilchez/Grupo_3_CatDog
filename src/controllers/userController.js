const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require('../database/models')

module.exports = {
    login: (req, res) => {
        res.render('user/login', {
            titulo: "Login",
            session: req.session
        })
    },
    register: (req, res) => {
        res.render("user/register", {
            titulo: "Register",
            session: req.session
        })
    },

    processRegister: (req, res) => {
        let errors = validationResult(req);    //verifica si hubo errores en el form
         if (errors.isEmpty()) { 
            db.User.create({
                name: req.body.name,
                userName: req.body.userName,
                email: req.body.email,
                rol_id: 1,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file ? req.file.filename : "default.jpg"
            })
            .then((user) => {
                res.redirect("/usuarios/login")
            })
            .catch(error => res.send(error))
        } else {
            //codigo que muestra en caso de que encontro errores
            res.render('user/register', {
                titulo: "Register ",
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            //Levantar sesión
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
            req.session.user = {
                id: user.id,
                name: user.name,
                userName: user.userName,
                avatar: user.avatar,
                email: user.email,
                rol: user.rol_id
            }

            if (req.body.remember) {
                const TIME_IN_MILISECONDS = 60000;
                res.cookie('catdogCookie', req.session.user, {
                    expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                    httpOnly: true,
                    secure: true
                })
            }

            res.locals.user = req.session.user

            res.redirect('/')
        })
        .catch(error => console.log(error)) 

        } else {
            res.render('user/login', {
                titulo: "Login",
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    profile: (req, res) => {
        db.User.findOne({
            where: {
                id: req.session.user.id
            },
            include: [{ association: "addresses" }],
        })
        .then((user) => {
            res.render("user/userProfile", {
                session: req.session,
                user,
                titulo: req.session.user.name,
                css: "userProfile.css"
            })
        })
    },
    profileUpdate: (req, res) => {
        let errors = validationResult(req);
        let userActivo = db.User.findByPk(req.session.user.id)
        if(errors.isEmpty()){
            db.User.update({
                ...req.body,
                avatar: req.file ? req.file.filename : userActivo.avatar
            },{
                where: {
                    id: req.session.user.id
                }
            })
            .then(() => 
                res.redirect("/usuarios/perfil")
            )
            .catch(error => res.send(error))
        }else{
            db.User.findOne({
                where: {
                    id: req.session.user.id
                },
                include: [{ association: "addresses" }],
            })
            .then((user) => {
                res.render("user/userProfile", {
                    session: req.session,
                    user,
                    titulo: req.session.user.name,
                    css: "userProfile.css",
                    errors: errors.mapped()
                })
            })
        }
    },
    addressCreate: (req, res) => {
        db.Address.create({
            ...req.body,
            user_id: req.session.user.id,
        })
        .then(() => res.redirect("/usuarios/perfil"))
        .catch((error) => res.send(error))
    },
    addressDestroy: (req, res) => {
        db.Address.destroy({
            where: {
                id: req.params.id,
            }
        })
        .then(() => {
            res.redirect("/usuarios/perfil")    
        })
        .catch((error) => res.send(error))
    },
    logout: (req, res) => {
        req.session.destroy();
        if (req.cookies.catdogCookie) {
            res.cookie('catdogCookie', "", { max: -1 })
        }
        res.redirect('/')
    }
}