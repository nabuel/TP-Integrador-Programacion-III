/*====================
    Modelos de ventas
====================*/
import conexion from "../database/db.js";

// Traer todas las ventas
const getVentas = () => {
    return conexion.query(`SELECT id, fecha, nombre_cliente, precio_total
                           FROM ventas;`);
}

// Insertar venta nueva (desde cliente)
const createVenta = (fecha, nombre_cliente, precio_total) => {
    const sql = `INSERT INTO ventas (fecha, nombre_cliente, precio_total)
                            VALUES (?, ?, ?);`
    return conexion.query(sql, [fecha, nombre_cliente, precio_total]);
}

const insertIntoProductSales = (productId, saleId, cantidad, precio_unitario) => {
    const sql = `INSERT INTO productos_ventas (id_producto, id_venta, cantidad, precio_unitario)
                            VALUES (?, ?, ?, ?);` 
    return conexion.query(sql, [productId, saleId, cantidad, precio_unitario]);
}


export default {
    getVentas,
    createVenta,
    insertIntoProductSales
}