const nombreUser = sessionStorage.getItem("nombreUsuario");
let carrito = JSON.parse(sessionStorage.getItem("productosCarrito")); // test
const carritoSinRepetidos = [];

const botonImprimir = document.getElementById("boton-imprimir");

botonImprimir.addEventListener("click", () => {

    imprimirTicket();
});

function mostrarMensajeAgradecimiento() {
    const contenedorAgradecimiento = document.getElementById("mensaje-agradecimiento");

    contenedorAgradecimiento.innerText += ` ${nombreUser}!`;
}

function imprimirTicket() {

    /**
     * https://github.com/parallax/jsPDF
       https://parallax.github.io/jsPDF/docs/ */

    const productosVenta = [];

    // Gracias a CDN extraemos la clase jspdf del objeto global window
    const { jsPDF } = window.jspdf;

    // Creamos una nueva instancia del document pdf usando la clase jsPDF
    const doc = new jsPDF(); // Ahora doc contendra todos los metodos para poder crear un ticket

    let y = 20; // establecemos margen superior de 20 pix en el eje vertical.

    doc.setFontSize(20); // establecemos el tamaᇸo fuente del titulo

    doc.text("ticket-rappigames", 20, y); // definimos titulo del ticket

    y += 20;

    doc.setFontSize(14); // reducimos tam. fuente para imprimir prod. del ticket.

    carrito.forEach(producto => {

        const existente = productosVenta.find(p => p.id === producto.id);

        if (existente) {
            existente.cantidad++;
        } else {
            productosVenta.push({
                id: producto.id,
                nombre: producto.nombre,
                cantidad: 1,
                precio_unitario: producto.precio
            });
        }
    });

    productosVenta.forEach(producto => {
        
        doc.text(`${producto.cantidad}x ${producto.nombre} - ${producto.precio_unitario}`, 20, y);

        y += 5;
    });

    const precioTotal = carrito.reduce((total, producto) => total + parseInt(producto.precio), 0);

    // Separamos los productos del total
    y += 20;

    doc.text(`TOTAL: $${precioTotal}`, 20, y);

    const fecha = new Date();
    //importar nombre user
    const nombreTicket = `${nombreUser}_${fecha.toISOString()}`

    //imprimimos ticket de venta
    doc.save(`${nombreTicket}.pdf`);

    registrarVenta(precioTotal, productosVenta);
}

async function registrarVenta(precioTotal, productosVenta) {
    try {
        const fecha = new Date();

        const fechaFormato = fecha.toISOString().slice(0, 19).replace("T", " ");

        const data = {
            fecha: fechaFormato,
            precio_total: precioTotal,
            nombre_cliente: nombreUser,
            products: productosVenta
        }

        const response = await fetch("http://localhost:3000/api/ventas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = response.json();

        if (response.ok) {
            console.log("Venta registrada: ", result.message);
            alert("Venta registrada: ", result.message);

            //hecho esto eliminamos el item del sessionStorage y redirigimos
            sessionStorage.removeItem("nombreUsuario");
            sessionStorage.removeItem("productosCarrito");

            window.location.href = "bienvenida.html";
        }
    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
};

function init() {
    mostrarMensajeAgradecimiento();
}

init();