import { Router } from "express";
import { vistaProductos, vistaRegistrar, viewCreateProduct } from "../controllers/controlador.vistas.js";
import { requerirAutenticacion } from "../middlewares/middleware.js";

const router = Router();

/**
 * Vistas de principal, obtener por ID, ...
 */
router.get("/principal", requerirAutenticacion, vistaProductos);

router.get("/principal/modificar/producto/:id", requerirAutenticacion, validarId, viewModifyProduct);

/**
 * Enrutador que atiende peticiones GET y llama al controlador 'vistaRegistrar'.
 * Esta protegida por el middleware de ruta 'requerirAutenticacion'.
 */
router.get("/principal/registrar/admin", requerirAutenticacion, vistaRegistrar);


/**
 * Enrutador que atiende peticiones GET y llama al controlador 'vistaRegistrar'.
 * Esta protegida por el middleware de ruta 'requerirAutenticacion'.
 */
router.get("/principal/registrar/producto", requerirAutenticacion, viewCreateProduct);

export default router;