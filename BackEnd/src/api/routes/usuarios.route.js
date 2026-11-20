import { Router } from "express";
import { crearUsuario } from "../controllers/controlador.usuarios.js";

const router = Router();

/**
 * Enrutador que atiende peticiones POST en '/api/usuarios/crear' y llama al controlador 'crearUsuario'.
 */
router.post("/crear", crearUsuario);

export default router;