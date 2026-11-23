import modeloProductos from "../models/modelo.productos.js";


//	Trae todos los productos para el administrador
export const vistaProductos = async (_, res) => {
	
	const [rows] = await modeloProductos.getProductos();
	
	res.render("get", {
		title: "Dashboard principal",
        listaProductos: rows
	}); 
}

/**	
 * Funcion flecha que contiene la logica del endpoint '/registrar/producto'.
 * @param {*} _: Solicitud HTTP. No se utiliza.
 * @param {*} res: Respuesta HTTP.
 */
export const viewCreateProduct = async (_, res) =>{
	res.render("createProduct",{
		title: "Crear producto",
		about: "Creación de un producto"
	});
}
/**
 * Funcion flecha que contiene la logica del endpoint '/registrar/admin'.
 * @param {*} _: Solicitud HTTP. No se utiliza.
 * @param {*} res: Respuesta HTTP.
*/
export const vistaRegistrar = (_, res) => {
	res.render("register", {
		title: "Registrar usuario",
		about: "Creacion de usuario administrador",
	});
}