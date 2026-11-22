import { Router } from "express";
import { traerProductos, traerProducto, crearProducto, modificarProducto, borrarProducto, traerProductosActivos} from "../controllers/controlador.producto.js";
import { requerirAutenticacion, validarId, validarProducto } from "../middlewares/middleware.js";

const router = Router();

// Protejo directo con un middleware de aplicacion todos los endpoints
router.use(requerirAutenticacion);

//  Obtengo todos los productos.

router.get("/", traerProductos);

// Obtengo todos los productos activos

router.get("/activos", traerProductosActivos);


// Obtengo el producto por id

router.get("/:id", validarId, traerProducto);


//  Guardado de un nuevo product. 

router.post("/", validarProducto, crearProducto);

// Modificación de un product.

router.put("/", validarProducto, modificarProducto)


// Eliminación del producto indicado

router.delete("/:id", validarId, borrarProducto);


export default router;