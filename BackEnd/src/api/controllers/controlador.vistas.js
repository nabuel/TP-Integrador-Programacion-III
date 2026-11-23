import modeloProductos from "../models/modelo.productos.js";


//	Trae todos los productos para el administrador
export const vistaProductos = async (_, res) => {

	const [rows] = await modeloProductos.getProductos();

	res.render("get", {
		title: "Dashboard principal",
		listaProductos: rows
	});
}

export const viewModifyProduct = async (req, res) => {
	
	const id = req.params.id;
	const [rows] = await modeloProductos.getProductoById(id);

	res.render("put", {
		title: "Modificar producto",
		about: "Modifique el producto",
		product: rows[0]
	});
}