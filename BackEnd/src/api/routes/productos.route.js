import { Router } from "express";
import { traerProductos, traerProducto, getElementByCategory,getElementsByAvaibletly,crearProducto, modificarProducto, borrarProducto} from "../controllers/controlador.producto.js";
import { requerirAutenticacion, validarId, validarProducto } from "../middlewares/middleware.js";

const router = Router();

//  Obtengo todos los productos.

router.get("/", traerProductos);

// Obtengo todos los productos activos

// router.get("/activos", traerProductosActivos);

// Get products by their avaibletly

router.get("/activos/:disponible", getElementsByAvaibletly)

// Get products by their category.

router.get("/categoria/:categoria", getElementByCategory)

// Obtengo el producto por id


router.get("/:id", validarId, traerProducto);


//  Guardado de un nuevo product. 

router.post("/", requerirAutenticacion, validarProducto, crearProducto);

// Modificación de un product.

router.put("/", requerirAutenticacion, validarProducto, modificarProducto)


// Eliminación del producto indicado

router.delete("/:id", requerirAutenticacion, validarId, borrarProducto);


export default router;