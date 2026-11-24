import modeloVentas from "../models/modelo.ventas.js";

export const traerVentas = async (_, res) => {

    const [ventas] = await modeloVentas.getVentas();

    if (ventas.length === 0) {
        res.status(404).json({
            mensaje: "No se han encontrado ventas"
        });
    }

    res.status(200).json({
        payload: ventas
    });

}

export const crearVenta = async (req, res) => {

    try {
        const { fecha, precio_total, nombre_cliente, products } = req.body;
    
        if (!fecha || !precio_total || !nombre_cliente || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                message: "Datos invalidos. Debes enviar date, total_price, user_name y products como array"
            });
        };
    
        const [saleResult] = await modeloVentas.createVenta(fecha, nombre_cliente, precio_total);
    
        const saleId = saleResult.insertId;
    
        for (const product of products) {
            await modeloVentas.insertIntoProductSales(
                product.id, 
                saleId, 
                product.cantidad,
                product.precio_unitario
            );
        };
    
        res.status(200).json({
            message: "Venta registrada con exito"
        });

    } catch (error) {
        console.log("Error creando venta: ", error);

        res.status(500).json({
            message: "Error interno del servidor al crear un producto"
        });
    }

}