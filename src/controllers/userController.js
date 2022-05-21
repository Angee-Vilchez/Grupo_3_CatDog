const {users, writeUsers} = require('../data');
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
    login: (req, res) =>{ 
        res.render('user/login', {
           titulo: "Login",
           session: req.session
        })
    },
    register: (req,res) =>{
        res.render("user/register",{
            titulo:"Registro",
            session:req.session
        })
    },

    processRegister: (req, res)=>{
        let errors = validationResult(req);    //verifica si hubo errores en el form
        
       if(errors.isEmpty()){     //si no hay errores, crea el usuario
       
       // crea un usuario(Registrar un usuario - Guardarlo en el JSON)
       //Paso 1 - Crear un objeto User

            let lastId = 0;
            users.forEach(user => {
                if(user.id > lastId){
                    lastId = user.id
                }
            });

            let newUser = {
                id: lastId + 1,
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file ? req.file.filename : "default.jpg",
                rol: "USER"
            }

        // Paso 2 - Guardar el nuevo usuario en el array de usuarios

            users.push(newUser)

        // Paso 3 - Escribir el JSON de usuarios con el array actual

            writeUsers(users)

        // Paso 4 - Devolver respuesta (redirección)

            res.redirect("/user/login")

        } else {
            //codigo que muestra en caso de que encontro errores
            res.render('user/register',{
                titulo:"Registro",
                errors: errors.mapped(),
                session:req.session
            })
        }
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
       
        if(errors.isEmpty()){
        //levantar sesión
        let user = users.find(user => user.email === req.body.email)
        
        req.session.user ={
            id: user.id,
            name: user.name,
            surname: user.surname,
            avatar: user.avatar,
            email: user.email,
            rol: user.rol
        }

        if(req.body.remember){
        const TIME_IN_MILISECONDS = 60000;
        res.cookie('catdogCookie', req.session.user, {
            expires: new Date(Date.now() + TIME_IN_MILISECONDS),
            httpOnly: true,
            secure: true
        })
    }

    res.locals.user = req.session.user
    
    res.redirect('/')

    }else{
    
        res.render('user/login', {
        titulo: "Login",
        errors: errors.mapped(),
        session: req.session
        })
      }
    },
    logout: (req,res) => {
        req.session.destroy();
        if(req.cookies.catdogCookie){
            res.cookie('catdogCookie', "", {max: -1})
        }
        res.redirect('/')
    }
}