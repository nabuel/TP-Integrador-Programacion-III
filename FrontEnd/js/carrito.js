const contenedorProductos = document.getElementById("contenedor-productos");
const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");
const carrito = JSON.parse(sessionStorage.getItem("productosCarrito")); //  Testear si trae los productos del carrito

const carritoSinRepetidos = [];

btnFinalizarCompra.addEventListener("click", (event) => {
    if (window.confirm("¿Desea finalizar su compra?")) {
        window.location.replace("./ticket.html");
    }
});
//  MUESTRO LOS PRODUCTOS DE LA LISTA DEL CARRITO
mostrarCarrito(carrito);
mostrarValorCarrito();

/**
 * Muestra el valor del carrito por pantalla
 */
function mostrarValorCarrito() {
    var totalHTML = document.getElementById("precio-total");

    totalHTML.textContent = `$ ${carrito.reduce((total, producto) => {
        return total + producto.precio;
    }, 0)}`;
}

function mostrarCarrito(carrito) {
    let mensaje = "<ul>";

    //  Elimina los elementos repetidos para la vista
    carrito.forEach((p) => {
        if (!carritoSinRepetidos.some((producto) => producto.id == p.id))
            carritoSinRepetidos.push(p);
    });

    carritoSinRepetidos.forEach(
        (p) =>
        (mensaje += `<li class="bloque-producto">
                        <img src="./img/${producto.imagen}" alt="${producto.nombre}">
                        <p class="nombre-item">${p.nombre} - ${p.precio}$</p>
                        <button class="boton-eliminar" id="${p.id}">Eliminar</button>
                        <button class="boton-sumar" id="${p.id}">+</button>
                        <p class="cantidad" id="contador-${p.id}">${carrito.reduce(
            (sum, producto) => {
                if (producto.id === p.id) {
                    sum += 1;
                }
                return sum;
            },
            0,
        )}</p>
            <button class="boton-restar" id="${p.id}">-</button>
        </li>`),
    );

    mensaje += "</ul>";
    contenedorProductos.innerHTML = mensaje;

    //  ESCUCHA EL EVENTO DE ELIMINAR UN PRODUCTO DEL CARRITO

    const botonesEliminado = document.querySelectorAll(".boton-eliminar");

    botonesEliminado.forEach((b) =>
        b.addEventListener("click", (e) => {
            eliminarProducto(carrito.find((p) => p.id == e.target.id));
        }),
    );

    // SUMO 1 AL CARRITO
    const botonesSuma = document.querySelectorAll(".boton-sumar");

    botonesSuma.forEach((b) =>
        b.addEventListener("click", (e) => {
            const cantidad = document.getElementById(`contador-${e.target.id}`);

            cantidad.textContent = `${parseInt(cantidad.textContent) + 1}`;
            agregarCarrito(productos.find((p) => p.id == e.target.id));
        }),
    );

    // LE SACO 1 AL CARRITO
    const botonesResta = document.querySelectorAll(".boton-restar");

    botonesResta.forEach((b) =>
        b.addEventListener("click", (e) => {
            const cantidad = document.getElementById(`contador-${e.target.id}`);

            let resta = parseInt(cantidad.textContent) - 1;

            if (resta > 0) {
                carrito.splice(
                    carrito.indexOf(carrito.find((p) => p.id == e.target.id)),
                    1,
                );
                cantidad.textContent = `${resta}`;
                almacenarCarrito();
            } else {
                eliminarProducto(carrito.find((p) => p.id == e.target.id));
            }
        }),
    );
}

function agregarCarrito(producto) {
    carrito.push(producto);
    almacenarCarrito();
    mostrarContador();
    mostrarCarrito();
}

/**
 * Elimina el producto indicado del carrito.
 * @param {*} producto producto a eliminar.
 */
function eliminarProducto(producto) {
    carrito = carrito.filter((p) => p.id != producto.id);
    carritoSinRepetidos.splice(carritoSinRepetidos.indexOf(producto), 1);
    almacenarCarrito();
    mostrarContador();
    mostrarCarrito();
}

function almacenarCarrito() {
    sessionStorage.setItem("productosCarrito", JSON.stringify(carrito));
}

function mostrarContador() {
    const contador = document.getElementById("contador-carrito");

    contador.textContent = `${carrito.length}`;
}
