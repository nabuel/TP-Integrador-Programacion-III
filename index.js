import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { __dirname, join } from "./src/api/utils/index.js";
import { rutaVistas, rutaProductos, rutaVentas } from "./src/api/routes/index.js";

const app = express();
const PORT = environments.port;

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


/*=====================
	Rutas
=====================*/

/**
 * Ruta para los endpoints
 */
app.use("/api/productos", rutaProductos);

app.use("/api/ventas", rutaVentas);

/**
 * Ruta para las vitas
 */
app.use("/dashboard", rutaVistas);

// Para que el servidor siga detectando las nuevas peticiones
app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});










