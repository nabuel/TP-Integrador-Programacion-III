import modeloProductos from "../models/modelo.productos.js";


//	Trae todos los productos para el administrador
export const vistaProductos = async (_, res) => {
	
	const [rows] = await modeloProductos.getProductos();
	
	res.render("get", {
		title: "Dashboard principal",
        listaProductos: rows
	}); 
}

// Trae el producto por id
export const vistaObtenerPorId = (req, res) => {
	res.render("get", {
		title: "Consultar producto"
	});
}


// Renderizamos /views/index.ejs