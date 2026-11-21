import { Router } from "express";
import { crearUsuario, vistaRegistrar } from "../controllers/controlador.usuarios.js";
import { requerirAutenticacion } from "../middlewares/middleware.js";

const router = Router();

/**
 * Enrutador que atiende peticiones GET y llama al controlador 'vistaRegistrar'.
 * Esta protegida por el middleware de ruta 'requerirAutenticacion'.
 */
router.get("/registrar", requerirAutenticacion, vistaRegistrar);

/**
 * Enrutador que atiende peticiones POST y llama al controlador 'crearUsuario'.
 * Esta protegido por posibles peticiones POST desde herramientas externas.
 */
router.post("/registrar", requerirAutenticacion, crearUsuario);


export default router;