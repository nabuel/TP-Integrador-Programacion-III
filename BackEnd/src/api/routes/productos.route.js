import { Router } from "express";
import { traerProductos, traerProducto, crearProducto, modificarProducto, borrarProducto, traerProductosActivos} from "../controllers/controlador.producto.js";
import { requerirAutenticacion, validarId, validarProducto } from "../middlewares/middleware.js";

const router = Router();

//  Obtengo todos los productos.

router.get("/", traerProductos);

// Obtengo todos los productos activos

router.get("/activos", traerProductosActivos);


// Obtengo el producto por id

router.get("/:id", validarId, traerProducto);


//  Guardado de un nuevo juego 

router.post("/", requerirAutenticacion, validarProducto, crearProducto);

// Modificación de un juego.

router.put("/", requerirAutenticacion, validarProducto, modificarProducto)


// Eliminación del producto indicado

router.delete("/:id", requerirAutenticacion, validarId, borrarProducto);


export default router;