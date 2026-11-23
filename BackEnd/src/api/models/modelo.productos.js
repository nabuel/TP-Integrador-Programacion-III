/*====================
    Modelos de producto
====================*/
import conexion from "../database/db.js";

// Traer todos los productos.
const getProductos =  () =>{
    
    return conexion.query("SELECT * FROM productos");
}

const getElementsByAvaibletly = (avaibletly) => {
    const sql = "SELECT * FROM productos WHERE activo = ?";
    return conexion.query(sql, avaibletly);
}


// Traer producto por id.
const getProductoById =  (id) =>{
    const sql = "SELECT * FROM productos WHERE id = ?";
    return  conexion.query(sql, id);
}


const getElementByCategory = (category) =>{
    const sql = "SELECT * FROM productos WHERE categoria = ?";

    return conexion.query(sql, category);
}

// Crear producto
const createProducto = (nombre, precio, imagen, activo, categoria) =>{
    const sql = "INSERT productos SET nombre = ?,precio = ?,imagen = ?,activo = ?,categoria = ?";

    return conexion.query(sql, [nombre,precio,imagen, activo, categoria]);
}


//Actualizar producto
const updateProducto = (nombre, imagen, precio, activo, categoria, id) =>{
    const sql = "UPDATE productos SET nombre = ?,precio = ?,imagen = ?,activo = ?,categoria = ? WHERE id = ?";

    return conexion.query(sql, [nombre,precio,imagen, activo,categoria, id]);
}


//  Borrar producto
const deleteProducto =  id =>{
    const sql = "DELETE FROM productos WHERE id = ?";
    
    return conexion.query(sql,id);
};


export default {
    getProductos,
    getElementsByAvaibletly,
    getProductoById,
    getElementByCategory,
    createProducto,
    updateProducto,
    deleteProducto
}
