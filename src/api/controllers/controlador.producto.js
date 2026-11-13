import modeloProductos from "../models/modelo.productos.js";

const traerProductos = async (_, res) =>{
    const [productos] =  await modeloProductos.getProductos();
    
    if(productos.length === 0){
        return res.status(404).json({
            mensaje: "No se han encontrado productos"
        });
    };

    res.status(200).json({
        payload: productos
    });
};

const traerProductosActivos = async (_, res) => {
    const [productosActivos] = await modeloProductos.getProductosActivos();

    if(productosActivos.length === 0){
        return res.status(404).json({
            mensaje: "No se han encontrado productos"
        });
    };

    res.status(200).json({
        payload: productosActivos
    });
}

const traerProducto = async (req, res)=>{

    try{
        
        const [producto] = await modeloProductos.getProductoById(req.params.id)
        
        if(!producto.length){
            return res.status(404).json({
                mensaje: `No se ha encontrado un producto con id ${req.params.id}`
            });
        }
    
        res.status(200).json({
            payload: producto
        });
    } catch(error){
        res.status(500).json({
            mensaje: "Error interno con la base de datos"
        });
    }
}

const crearProducto = async (req,res)=>{
    try{
        const {nombre,precio,imagen,activo,categoria} = req.body;
        
        const [respuesta] = await modeloProductos.createProducto(nombre,imagen,precio,activo,categoria)

        res.status(201).json({
            mensaje: `Producto creado`,
            productoId : respuesta.insertId
        });

    } catch(error){
        res.status(500).json({
            mensaje: "Error al crear producto"
        });
    };


};

const modificarProducto = async (req,res)=>{
    try{
        const {nombre, imagen, precio, activo, categoria, id} = req.body;
        const [respuesta] = await modeloProductos.updateProducto(nombre, imagen, precio, activo, categoria, id)
        
        if(respuesta.changedRows === 0){
            return res.status(400).json({
                mensaje : `No se han aplicado cambios al producto con id ${id}` 
            })
        }
        res.status(200).json({
            mensaje: `Juego con id ${id} actualizado`
        })
        
    }catch(error){
        // Ej: Fallo la conexion a la BBDD, tardo demasiado, la tabla no existe, error de sintaxis
        res.status(500).json({
            mensaje: "Error interno del servidor al modificar un producto"
        });
    }
    
}

const borrarProducto = async (req, res)=>{
    try{
        const id = req.params.id;
        
        res.status(204).json({
            mensaje : `Producto con id ${id} eliminado correctamente`
        });

    }catch(error){
        res.status(500).json({
            mensaje: "Error al intentar borrar producto"
        });
    }
}


export {
    traerProductos,
    traerProductosActivos,
    traerProducto,
    crearProducto,
    modificarProducto,
    borrarProducto
}