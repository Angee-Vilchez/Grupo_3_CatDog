const express = require('express');
const app = express();
const path = require('path');
const process = require('process');
//require('dotenv').config();
const PORT = 3030;
const methodoverride = require('method-override');
const bodyParser = require("body-parser")
const session = require('express-session');
const cookieParser = require('cookie-parser')
const cookieSession = require('./middlewares/cookieSession');

app.use(express.static('public'));

/* Temple engine config */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Middlewares de aplicacion */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodoverride('_method'));
/* session */
app.set('trust proxy', 1);
app.use(session({
    secret: "catdog!!",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
app.use(cookieParser());
app.use(cookieSession)

/*Enrutadores*/
const indexRouter = require('./routes/indexRouter');
const carritoRouter = require('./routes/carritoRouter')
const productosRouter = require('./routes/productosRouter');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');



/*Rutas*/
app.use('/', indexRouter);
app.use('/carrito', carritoRouter);
app.use('/productos', productosRouter);
app.use('/usuarios', userRouter);
app.use('/admin', adminRouter);


app.listen(PORT, () => console.log(`
Servidor escuchando en el puerto ${PORT}
http://localhost:${PORT}
`))
