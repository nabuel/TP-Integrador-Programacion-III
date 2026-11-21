import { Router } from "express";
import { vistaProductos } from "../controllers/controlador.vistas.js";
import { requerirAutenticacion } from "../middlewares/middleware.js";

const router = Router();

/**
 * Vistas de principal, obtener por ID, ...
 */
router.get("/principal", requerirAutenticacion, vistaProductos);

// router.get("/obtener/:id", requerirAutenticacion, vistaObtenerPorId);


export default router;