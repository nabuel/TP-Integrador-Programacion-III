import { Router } from "express";
import { traerVentas } from "../controllers/controlador.ventas.js";
import { requerirAutenticacion } from "../middlewares/middleware.js";

const router = Router();


// Traer todas las ventas
router.get("/", requerirAutenticacion, traerVentas);

// Guardar una venta nueva
// router.post("/", crearVenta);

export default router;