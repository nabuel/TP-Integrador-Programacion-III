import { Router } from "express";
import { viewModifyProduct, vistaProductos } from "../controllers/controlador.vistas.js";
import { requerirAutenticacion, validarId } from "../middlewares/middleware.js";

const router = Router();

/**
 * Vistas de principal, obtener por ID, ...
 */
router.get("/principal", requerirAutenticacion, vistaProductos);

router.get("/principal/modificar/producto/:id", requerirAutenticacion, validarId, viewModifyProduct);

export default router;