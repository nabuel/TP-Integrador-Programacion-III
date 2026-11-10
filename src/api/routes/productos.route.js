import { Router } from "express";
import { traerProductos, traerProducto, crearProducto, modificarProducto, borrarProducto} from "../controllers/controlador.producto.js";
import { validarId, validarProducto } from "../middlewares/middleware.js";

const router = Router();


//  Obtengo todos los productos.

router.get("/", traerProductos);


// Obtengo el producto por id

router.get("/:id", validarId, traerProducto);


//  Guardado de un nuevo juego 

router.post("/", validarProducto, crearProducto);

// Modificación de un juego.

router.put("/", validarProducto,modificarProducto)


// Eliminación del producto indicado

router.delete("/:id", validarId, borrarProducto);


export default router;