import modelProducts from "../models/modelo.productos.js";

const traerProductos = async (_, res) => {
    const [productos] = await modelProducts.getProductos();

    if (productos.length === 0) {
        return res.status(404).json({
            message: "No se han encontrado productos"
        });
    };

    res.status(200).json({
        payload: productos
    });
};


const getElementsByAvaibletly = async (req, res) => {

    const avaible = req.params.disponible == "false" ? false : true;

    const [products] = await modelProducts.getElementsByAvaibletly(avaible);

    if (products.length === 0) {
        return res.status(404).json({
            message: "No se han encontrado productos"
        });
    };

    res.status(200).json({
        payload: products
    });
}

const traerProducto = async (req, res) => {

    try {

        const [producto] = await modelProducts.getProductoById(req.params.id)

        if (!producto.length) {
            return res.status(404).json({
                message: `No se ha encontrado un producto con id ${req.params.id}`
            });
        }

        res.status(200).json({
            payload: producto
        });

    } catch (error) {
        res.status(500).json({
            message: "Error interno con la base de datos"
        });
    }
}


const getElementByCategory = async (req, res) => {
    try {
        const category = req.params.categoria;
        const [products] = await modelProducts.getElementByCategory(category);

        if (!products.length > 0) {
            return res.status(400).json({
                message: `No hay productos catalogados como "${category}"`
            });
        };

        res.status(200).json({
            payload: products
        });

    } catch (error) {
        console.error(error);
    }
}

const getProductsSortedAsc = async (req, res) =>{
    try{
        const attribute = req.params.atributo;

        const [products] = await modelProducts.getProductsSortedAsc(attribute);
        
        if (products.length === 0) {
            return res.status(404).json({
                message: "No se han encontrado productos"
            });
        };
            
        res.status(200).json({
            payload: products
        });
    }catch(error){
        console.error(error);
    }
}

const getProductsSortedDesc = async (req, res) =>{
    try{
        const attribute = req.params.atributo;

        const [products] = await modelProducts.getProductsSortedDesc(attribute);    
            
        if (products.length === 0) {
            return res.status(404).json({
                message: "No se han encontrado productos"
            });
        };
            
        res.status(200).json({
            payload: products
        });
    }catch(error){
        console.error(error);
    }
}

const crearProducto = async (req,res)=>{
    try{
        const {productName,productPrice,productImg,productActive,productCategory} = req.body;
        
        console.log(req.body);

        const [respuesta] = await modelProducts.createProducto(productName,productPrice,productImg,productActive,productCategory)

        res.status(201).json({
            message: `Producto creado`,
            productoId: respuesta.insertId
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al crear producto"
        });
    };
};

const modificarProducto = async (req, res) => {
    try {
        const { productId, productName, productPrice, productImg, productActive, productCategory } = req.body;
        const [respuesta] = await modelProducts.updateProducto(productName, productPrice, productImg, productActive, productCategory, productId);

        if (respuesta.changedRows === 0) {
            return res.status(400).json({
                message: `No se han aplicado cambios al producto con id ${productId}`
            })
        }

        res.status(200).json({
            message: `Producto con id ${productId} actualizado`
        })

    } catch (error) {
        // Ej: Fallo la conexion a la BBDD, tardo demasiado, la tabla no existe, error de sintaxis
        res.status(500).json({
            message: "Error interno del servidor al modificar un producto"
        });
    }
}

const borrarProducto = async (req, res) => {
    try {
        const id = req.params.id;

        const [rows] = await modelProducts.deleteProducto(id);

        if (rows.length === 0) {

            return res.status(400).json({
                message: `Producto con id ${id} innexistente`
            })
        }

        res.sendStatus(204);

    } catch (error) {
        res.status(500).json({
            message: "Error al intentar borrar producto"
        });
    }
}


export {
    traerProductos,
    getElementsByAvaibletly,
    traerProducto,
    getElementByCategory,
    getProductsSortedAsc,
    getProductsSortedDesc,
    crearProducto,
    modificarProducto,
    borrarProducto
}