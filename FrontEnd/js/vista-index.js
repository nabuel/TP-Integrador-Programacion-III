const contenedorProductos = document.getElementById("contenedor-productos");
const urlBase = "http://localhost:3000";

const carrito = [];
const productos = [];

/*=======================
        FUNCIONES
    =======================*/

/**
 * Obtengo los productos guardados en la bd
 */
async function buscarProductosActivos() {
    try {
    // Hago la request a la api para obtener todos los productos.
        const response = await fetch(`${urlBase}/api/productos/activos`);

        // convierto la response en un json.
        const data = await response.json();
        // Valido que la request haya sido exitosa. En caso de que no lo sea se notifica al usuario.
        if (!response.ok) {
            return mostrarError(data.mensaje);
        }

        data.payload.forEach((e) => productos.push(e));

        renderizarProductos(productos);
    
    } catch (error) {
        console.error(error);
    }
}

/**
 * Agrega las cartas de los productos al html.
 * productos -> lista donde se encuentran los productos.
 */
function renderizarProductos(productos) {
    let productosHTML = "";
    productos.forEach((producto) => {
        productosHTML += `<div class="card-producto">
                                    <button class="btn-agregar-prod-carrito"  onclick="agregarCarrito(${producto.id})">
                                        <img src="./img/${producto.imagen}" alt="${producto.nombre}">
                                    </button>
                                    <p class="nombre-prod">${producto.nombre}</p>
                                    <p class="precio-prod">${producto.precio}$</p>
                                </div>`;
    });
    contenedorProductos.innerHTML = productosHTML;
}

/**
 *  Agrega el producto al carrito
 *  id -> id del producto que se quiere agregar
 */
function agregarCarrito(id) {
    const producto = productos.find((p) => p.id == id);
    carrito.push(producto);
    console.log("Agregando al carrito: ", producto);
    almacenarCarrito();
}

/**
 * Guarda el carrito en la sessionStorage
 */
function almacenarCarrito() {
    sessionStorage.setItem("productosCarrito", JSON.stringify(carrito));
}

function mostrarError(error) {
    console.log(error);
    contenedorProductos.innerHTML = error;
}

buscarProductosActivos();
