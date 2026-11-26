const contenedorProductos = document.getElementById("contenedor-productos");
const URL_BASE = "http://localhost:3000";
const musica = document.getElementById("musicaFondo");
const btnStop = document.getElementById("musica-img");
musica.volume = 0.05;
let carrito = [];
const productos = [];
const carritoHistorico = JSON.parse(sessionStorage.getItem("productosCarrito"));

/*===============================
REFACTORIZANDO
===============================*/

/**
 * Ejecuta una petición fetch a la url indicada. En caso de que la petición no sea exitosa se muestra un mensaje.
 * @param {*} url url a la cual se va a realizar la petición Get.
 * @returns {Promise} una promesa la cual son los datos parseados como JSON de la response
*/
async function executeFetch(url) {
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        showMessage("error", data.message);
        return;
    }

    return data;
}

/**
 * Crea la estructura de la carta del producto indicado 
 * @param {*} product producto de donde se saca la información
 * @returns la estructura para renderizar el producto.
 */
function structureProductCard(product) {
    let messageHTML = !product.activo ? `<div class="card-producto product-deactivated">`
        : `<div class="card-producto">`;

    messageHTML += `<button class="btn-agregar-prod-carrito"  onclick="agregarCarrito(${product.id})">
                        <img src="${URL_BASE}/img/${product.imagen}" alt="${product.nombre}" class="card-img">
                    </button>
                            <p class="nombre-prod font-large">${product.nombre}</p>
                            <p class="precio-prod font-large">${product.precio}$</p>
                            
                            <div class="iconos-acciones">
                            
                            </div>
                        </div>`;

    return messageHTML;
}

/**
 * Renderiza los productos de la lista
 * @param {*} products lista de productos a renderizar 
 */
function renderProductList(products) {
    let productsHTML = "";

    products.forEach(p => (productsHTML += structureProductCard(p)));

    contenedorProductos.innerHTML = productsHTML;
}

/**
 * Renderiza el mensaje informativo.  
 * @param {*} estado estado de la petición 
 * @param {*} mensaje mensaje informatico para el usuario
 */
function showMessage(estado, mensaje) {
    contenedorProductos.innerHTML = `<p class="mensaje ${estado}">${mensaje}</p>`;
}

/*============================
FILTROS PARA LOS PRODUCTOS
==============================*/

/**
 * Aplica los filtros para ver los productos según su categoria
 */
async function applyCategoryFilter() {
    const categoryFilter = document.getElementById("category-filter");
    const filterValue = categoryFilter.value;

    if (filterValue == "default") {
        window.location.reload();
        return;
    }


    const data = await executeFetch(`${URL_BASE}/api/productos/categoria/${filterValue}`);

    if (data) renderProductList(data.payload);
}

/**
 * Aplica los filtros de ordenamiento
 */
async function applySortFilter() {
    const sortFilter = document.getElementById("sort-filter");
    const sortValue = sortFilter.value;

    if (sortValue == "default") {
        window.location.reload();
        return;
    }

    let attribute;
    let order;

    (sortValue == "a-z" || sortValue == "z-a") ? attribute = "nombre" : attribute = "precio";
    (sortValue == "a-z" || sortValue == "ascendente") ? order = "asc" : order = "desc";

    let url = `${URL_BASE}/api/productos/${order}/${attribute}`;

    const data = await executeFetch(url);

    if (data) renderProductList(data.payload);
}




/*=======================
        FUNCIONES
    =======================*/

/**
 * Obtengo los productos guardados en la bd
 */
async function buscarProductosActivos() {
    try {
        // Hago la request a la api para obtener todos los productos.
        const response = await fetch(`${URL_BASE}/api/productos/activos/true`);

        // convierto la response en un json.
        const data = await response.json();
        // Valido que la request haya sido exitosa. En caso de que no lo sea se notifica al usuario.
        if (!response.ok) {
            return showMessage("error", data.mensaje);
        }

        data.payload.forEach((e) => productos.push(e));

        renderProductList(productos);

    } catch (error) {
        console.error(error);
    }
}

/**
 *  Agrega el producto al carrito
 *  id -> id del producto que se quiere agregar
 */
function agregarCarrito(id) {

    const producto = productos.find((p) => p.id == id);


    if (carritoHistorico) carrito = carrito.concat(carritoHistorico)

    carrito.push(producto);

    almacenarCarrito();
}

/**
 * Guarda el carrito en la sessionStorage
 */
function almacenarCarrito() {
    sessionStorage.setItem("productosCarrito", JSON.stringify(carrito));
}

function showUsername() {
    const nombre = sessionStorage.getItem("nombreUsuario");
    const contenedorBienvenida = document.getElementById("mensaje-bienvenida");

    contenedorBienvenida.innerText += ` ${nombre}!`;
}

function init() {
    showUsername()
    buscarProductosActivos();
    pararMusica();
}

function pararMusica() {
    btnStop.addEventListener("click", () => {
        if (musica.volume > 0) {
            musica.pause();
            musica.volume = 0;
        } else {
            musica.play();
            musica.volume = 0.05;
        }
    });
}


function showCounter() {
    const counter = document.getElementById("contador-carrito");
    let cantidad = carrito !== null ? carrito.length : 0;
    counter.textContent = `${cantidad}`;
}

init();
