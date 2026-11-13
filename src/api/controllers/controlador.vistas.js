import modeloProductos from "../models/modelo.productos.js";

export const vistaProductos = async (_, res) => {

    const [rows] = await modeloProductos.getProductos();

	res.render("index", {
		title: "Dashboard principal",
        listaProductos: rows
	}); // Renderizamos /views/index.ejs
}

export const vistaObtenerPorId = (_, res) => {
	res.render("get", {
		title: "Consultar producto"
	});
}