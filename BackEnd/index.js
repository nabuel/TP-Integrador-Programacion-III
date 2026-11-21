import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { __dirname, join } from "./src/api/utils/index.js";
import { rutaVistas, rutaProductos, rutaVentas, rutaLogin, rutaUsuarios } from "./src/api/routes/index.js";
import session from "express-session";

const {port, session_key} = environments;
const app = express();
const PORT = port;

/**
 * Utilizamos el metodo app.set() de Express para configurar propiedades de la aplicacion.
 * "view engine": es la propiedad que estamos configurando.
 * "ejs": es el motor de plantillas que queremos utilizar.
 */
app.set("view engine", "ejs");

/** Volvemos a utilizar app.set() pero configuramos otra propiedad.
 * "views" indica donde debe buscar Express las plantillas.
 */
app.set("views", join(__dirname, "src/views"));

/*=====================
	Middlewares
=====================*/
app.use(cors()); //Permite las solicitudes 
app.use(express.json()) // Parseo de JSON recibido en el body de la request
app.use(express.static(join(__dirname, "src/public"))); // Este middleware tiene como responsabilidad permitir que el navegador acceda directamente a archivos estáticos.
app.use(express.urlencoded({extended: true})); // Parseamos el urlencoded enviando con los <form> HTML

/**
 * Middleware de session
 */
app.use(session({
	secret: session_key,
	resave: false,
	saveUninitialized: true
}));

/*=====================
	Rutas
=====================*/

/**
 * Ruta para los endpoints de la api (middleware de aplicacion porque no se aplica a una ruta en especifico)
 */
app.use("/api/productos", rutaProductos);

app.use("/api/ventas", rutaVentas);

app.use("/api/usuarios", rutaUsuarios);

/**
 * Ruta para las vistas de administrador
 */
app.use("/dashboard", rutaVistas);

/**
 * Ruta para auth
 */
app.use("/", rutaLogin);


// Para que el servidor siga detectando las nuevas peticiones
app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


