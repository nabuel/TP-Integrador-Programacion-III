import { Router } from "express";
import { traerProductos, traerProducto, getElementByCategory,getElementsByAvaibletly,crearProducto, modificarProducto, borrarProducto, 
    getProductsSortedAsc, getProductsSortedDesc } from "../controllers/controlador.producto.js";
import { requerirAutenticacion, validarId, validarProducto } from "../middlewares/middleware.js";

const router = Router();

//  Obtengo todos los productos.

router.get("/", traerProductos);

// Get products by their avaibletly

router.get("/activos/:disponible", getElementsByAvaibletly)

// Get products by their category.

router.get("/categoria/:categoria", getElementByCategory)

// Obtengo el producto por id

router.get("/:id", validarId, traerProducto);

// Get products sort by their attribute from lowerst value to higest value
//  TO DO: crear middlewares para validar atributo

router.get("/asc/:atributo",  requerirAutenticacion, getProductsSortedAsc);

// Get products sorted by their attribute from higest value to lowerst value

router.get("/desc/:atributo",  requerirAutenticacion, getProductsSortedDesc);

//  Guardado de un nuevo product. 

router.post("/", requerirAutenticacion, validarProducto, crearProducto);

// Modificación de un product.

router.put("/", requerirAutenticacion, validarProducto, modificarProducto)


// Eliminación del producto indicado

router.delete("/:id", requerirAutenticacion, validarId, borrarProducto);


export default router;