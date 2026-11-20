import { Router } from "express";
import { crearUsuario } from "../controllers/controlador.usuarios.js";

const router = Router();

/**
 * Atiende peticiones POST en /crear.
 */
router.post("/crear", crearUsuario);

export default router;