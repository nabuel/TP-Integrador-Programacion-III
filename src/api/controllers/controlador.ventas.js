import modeloVentas from "../models/modelo.ventas.js";

const traerVentas = async (_, res) => {

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

export {
    traerVentas
}