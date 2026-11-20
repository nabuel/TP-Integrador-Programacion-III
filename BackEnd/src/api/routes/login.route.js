import { Router } from "express";
import { logoutUserAdmin, vistaLogin, loginUserAdmin, registrarDesdeLogin } from "../controllers/controlador.login.js";
import { requerirAutenticacion } from "../middlewares/middleware.js";
const router = Router();

/**
 * Atiende en la raiz y muestra la vistaLogin
 */
router.get("/", vistaLogin);

/**
 * Atiende en la raiz y muestra la vistaLogin
 */
router.get("/login", vistaLogin);

/**
 * Enrutador que atiende peticiones POST a /login y llama al controlador.
 */
router.post("/login", loginUserAdmin);

/**
 * Enrutador que atiende peticiones GET a /logout y destruye la session-express.
 */
router.get("/logout", logoutUserAdmin);

/**
 * Enrutador que atiende peticiones GET en /registrar, llama al middlware 'requerirAutenticacion' y al controlador 'registrarDesdeLogin'.
 */
router.get("/registrar", requerirAutenticacion, registrarDesdeLogin);

export default router;