/*====================
    Modelos de producto
====================*/
import conexion from "../database/db.js";

// Traer todas las ventas
const getVentas = () => {
    return conexion.query(`SELECT id, fecha, nombre_cliente, precio_total
                           FROM ventas;`);
}

// Insertar venta nueva (desde cliente)
const createVenta = (id, fecha, nombre_cliente, precio_total) => {
    return conexion.query(`INSERT INTO ventas (id, fecha, nombre_cliente, precio_total)
                            VALUES (${id}, ${fecha}, ${nombre_cliente}, ${precio_total})`);
}
export default {
    getVentas,
    createVenta
}