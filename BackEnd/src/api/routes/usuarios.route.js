import { Router } from "express";
import { crearUsuario} from "../controllers/controlador.usuarios.js";
import { requerirAutenticacion } from "../middlewares/middleware.js";

const router = Router();

/**
 * Enrutador que atiende peticiones POST y llama al controlador 'crearUsuario'.
 * Esta protegido por posibles peticiones POST desde herramientas externas.
 */
router.post("/registrar", requerirAutenticacion, crearUsuario);


export default router;
