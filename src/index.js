const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const {database} = require('./keys');
// initializations

const app = express();

// settings
// Establece un puerto (4000) si es que no hay uno en sistema
app.set('port', process.env.PORT || 5000);

// __dirname devuelve la direccion de la carpeta actual
// equivale a src/views
// uno es el objeto de la aplicacion
// y el otro es la carpeta de las vistas
app.set('views', path.join(__dirname, 'views'));

// Manejador de vistas
// Setea plantilla principal, direccion de plantillas, parciales, las extensiones de los archivos, y la direccion de las
// funciones que se usaran de handlebars
// El modulo path une  directorios
// Configuracion de Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

// Se establece handlebars como manejador de vistas
app.set('view engine','.hbs');

// Middlewares
// Sesion de usuario

// Muestra un mensaje en consola debido a las peticiones HTTP
app.use(morgan('dev'));
// Aceptar los datos de los formularios
app.use(express.urlencoded({extended:false}));
// Peticiones de JSON 
app.use(express.json());

// Global variables


// Routes
// Ruta inicial
app.use(require('./routes/'));

// Usamos las archivos de la carpeta routes
app.use(require('./routes/authentication'));


// Enlaces de la aplicacion
app.use('/links', require('./routes/links'));

// Enlaces SFE
app.use('/dashboard', require('./routes/dashboard'));


// Public
// La carpeta public se encuentra en src/public
app.use(express.static(path.join(__dirname,'/public')))
// Starting the server

// Se solicita el puerto
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});
