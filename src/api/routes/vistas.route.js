import { Router } from "express";
import { vistaObtenerPorId, vistaProductos } from "../controllers/controlador.vistas.js";

const router = Router();

/**
 * Vistas de principal, obtener por ID, ...
 */
router.get("/principal", vistaProductos);
router.get("/obtener", vistaObtenerPorId);


export default router;