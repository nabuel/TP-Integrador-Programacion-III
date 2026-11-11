import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import rutaProductos from "./src/api/routes/productos.route.js";
import rutaVentas from "./src/api/routes/ventas.route.js";

const app = express();
const PORT = environments.port;

/*=====================
	Middlewares
=====================*/
app.use(cors()); //Permite las solicitudes 

app.use(express.json()) // Parseo de JSON recibido en el body de la request


/*=====================
	Endpoints 
=====================*/

app.use("/api/productos", rutaProductos);
app.use("/api/ventas", rutaVentas);



// Para que el servidor siga detectando las nuevas peticiones
app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});










