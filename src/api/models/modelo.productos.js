/*====================
    Modelos de producto
====================*/

import conexion from "../database/db.js";

// Traer todos los productos.

const getProductos =  () =>{

    return conexion.query("SELECT id, nombre, precio, imagen FROM productos");

}

// Traer producto por id.

const getProductoById =  (id) =>{

    const sql = "SELECT id, nombre, precio, imagen FROM productos WHERE id = ?";

    return conexion.query(sql, [id]);

}

// Crear producto

const createProducto = (nombre, imagen, precio, activo, categoria) =>{

    const sql = "INSERT INTO productos (nombre, precio, imagen, activo, categoria) VALUES (?,?,?,?,?)";

    return conexion.query(sql, [nombre,precio,imagen, categoria, activo]);

}

//Actualizar producto

const updateProducto = (nombre, imagen, precio, activo, categoria, id) =>{

    const sql = "UPDATE productos SET nombre = ?,precio = ?,imagen = ?,activo = ?,categoria = ? WHERE id = ?";

    return conexion.query(sql, [nombre,precio,imagen, activo, categoria, id]);
}

//  Borrar producto

const deleteProducto =  id =>{
    const sql = "DELETE FROM productos WHERE id = ?";
    
    return conexion.query(sql,[id]);
};


export default {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
}