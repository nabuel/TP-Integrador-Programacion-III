import { Router } from "express";
import { traerVentas } from "../controllers/controlador.ventas.js";

const router = Router();


// Traer todas las ventas
router.get("/", traerVentas);

// Guardar una venta nueva
// router.post("/", crearVenta);

export default router;