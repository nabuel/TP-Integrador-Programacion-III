const contenedorProductos = document.getElementById("contenedor-productos");
const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");
let carrito = JSON.parse(sessionStorage.getItem("productosCarrito")); //  Testear si trae los productos del carrito
const nombre = sessionStorage.getItem("nombreUsuario");
const URL_BASE = "http://localhost:3000";



btnFinalizarCompra.addEventListener("click", () => {
    if (carrito.length > 0) {
        if (window.confirm("¿Desea finalizar su compra?")) {
            window.location.replace("./ticket.html");
        }
    }
});


//  MUESTRO LOS PRODUCTOS DE LA LISTA DEL CARRITO



function init() {

    mostrarNombreUsuario();
    mostrarMensaje();

}


/**
 * Muestra el valor del carrito por pantalla
 */
function mostrarValorCarrito() {
    const totalHTML = document.getElementById("precio-total");


    if (carrito.length == 0) totalHTML.textContent = "$ 0"

    totalHTML.textContent = `$ ${carrito.reduce((total, producto) => {
        return total + producto.precio;
    }, 0)}`;

}

function mostrarCarrito() {
    let mensaje = "";

    const carritoSinRepetidos = [];


    //  Elimina los elementos repetidos para la vista
    carrito.forEach((p) => {
        if (!carritoSinRepetidos.some((producto) => producto.id == p.id)) carritoSinRepetidos.push(p);
    });

    carritoSinRepetidos.forEach(
        p =>
        (mensaje += `<div class="card-producto">
                        <div class="first-container">
                            <p class="circulo" id="contador-${p.id}">${carrito.reduce(
            (sum, producto) => {
                if (producto.id === p.id) {
                    sum += 1;
                } return sum;
            }, 0,)}
                            </p>
                            <button class="boton boton-eliminar" id="${p.id}">🗑️</button>
                        </div>
                        <img class="card-img-carrito" src="${URL_BASE}/img/${p.imagen}" alt="${p.nombre}">
                        <p>${p.nombre} — ${p.precio}$</p>
                        <div class="intern-container">
                            <button class="boton boton-restar" id="${p.id}">-</button>
                            
                            <button class="boton boton-sumar" id="${p.id}">+</button>
                        </div>
                    </div>`),
    );
    contenedorProductos.innerHTML = mensaje;

    //  ESCUCHA EL EVENTO DE ELIMINAR UN PRODUCTO DEL CARRITO

    const botonesEliminado = document.querySelectorAll(".boton-eliminar");

    botonesEliminado.forEach(b =>
        b.addEventListener("click", (e) => {
            eliminarProducto(carrito.find(p => p.id == e.target.id));
        })
    );

    // SUMO 1 AL CARRITO
    const botonesSuma = document.querySelectorAll(".boton-sumar");

    botonesSuma.forEach((b) =>
        b.addEventListener("click", (e) => {
            let id = e.target.id;
            const cantidad = document.getElementById(`contador-${id}`);

            cantidad.textContent = `${parseInt(cantidad.textContent) + 1}`;

            agregarCarrito(carrito.find((p) => p.id == id));
        })
    );

    // LE SACO 1 AL CARRITO
    const botonesResta = document.querySelectorAll(".boton-restar");

    botonesResta.forEach((b) =>
        b.addEventListener("click", (e) => {
            let id = e.target.id;

            const cantidad = document.getElementById(`contador-${id}`);
            const producto = carrito.find(p => p.id == id);

            let resta = parseInt(cantidad.textContent) - 1;

            if (resta > 0) {

                restarProducto(producto);

                cantidad.textContent = `${resta}`;
            } else {
                eliminarProducto(producto);
            }

        })
    );

    mostrarValorCarrito();
}


/**
 * Agrega el producto al carrito
 * @param {*} producto producto a agregar.
 */
function agregarCarrito(producto) {
    carrito.push(producto);

    almacenarCarrito();
    mostrarCarrito();
}



function restarProducto(producto) {

    carrito.splice(carrito.indexOf(producto), 1);

    almacenarCarrito();
    mostrarCarrito();
}


/**
 * Elimina el producto indicado del carrito.
 * @param {*} producto producto a eliminar.
 */
function eliminarProducto(producto) {
    carrito = carrito.filter((p) => p.id != producto.id);


    almacenarCarrito();
    mostrarMensaje();
}

function almacenarCarrito() {
    sessionStorage.setItem("productosCarrito", JSON.stringify(carrito));
}

function mostrarNombreUsuario() {
    const tituloCarrito = document.getElementById("title-carrito");

    tituloCarrito.innerText = `Carrito de ${nombre}`;
}

function mostrarMensaje() {

    if (carrito.length > 0) mostrarCarrito();
    else {
        contenedorProductos.innerText = "Carrito sin productos";
        document.getElementById("precio-total").innerText = "";
    }
}


init();
