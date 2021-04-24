const express = require('express');
const morgan = require('morgan');
const expHB = require('express-handlebars');
const path = require('path');

//initalizations
const app = express();

//settings
app.set('port', process.env.PORT || 4000); //si hay un puerto definido en el sitema despinoble lo toma si no deja el 4000
app.set('views', path.join(__dirname, 'src/views'));//define la ubicación del folder views
app.engine('.hbs', expHB({
    defaultLayout: 'main',
    layoutsDir:  path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'utils'),
    extname: '.hbs',
    helpers: require('./src/lib/handlebars')
}));
app.set('view engine', '.hbs'); //arranca el motor

//Middleware, son las que estan pendientes de las peticiones que hace le cliente al servidor
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))//para recibir datos desde los formularios
app.use(express.json()); // para recibir archivos json desde el cliente

//Global variables
app.use((req, res, next) => {
    next();
});

//Rutas
app.use(require('./src/routes/index'));
app.use(require('./src/routes/auth'));
app.use('/links', require('./src/routes/links'));
/* app.get('/', (req, res) =>{
    res.send("hello word Dios Rigo")
})
 */
//Public
app.use(express.static(path.join(__dirname, './src/public')))

//Starting the server
console.log(app.get('port'));
app.listen(app.get('port'), ()=>{
    console.log('Server on port ', app.get('port'))
});

