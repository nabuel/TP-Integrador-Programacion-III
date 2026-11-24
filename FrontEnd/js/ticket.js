const userName = sessionStorage.getItem("nombreUsuario");
let cart = JSON.parse(sessionStorage.getItem("productosCarrito")); // test
const carritoSinRepetidos = [];
const URL_BASE = "http://localhost:3000";

const botonImprimir = document.getElementById("boton-imprimir");

botonImprimir.addEventListener("click", () => {

    imprimirTicket();
});

function showExitMessage() {
    const exitMessage = document.getElementById("mensaje-agradecimiento");

    exitMessage.innerText += ` ${userName}!`;
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

    cart.forEach(product => {

        const existente = productosVenta.find(p => p.id === product.id);

        if (existente) {
            existente.cantidad++;
        } else {
            productosVenta.push({
                id: product.id,
                nombre: product.nombre,
                cantidad: 1,
                precio_unitario: product.precio
            });
        }
    });

    productosVenta.forEach(producto => {
        
        doc.text(`${producto.cantidad}x ${producto.nombre} - ${producto.precio_unitario}`, 20, y);

        y += 5;
    });

    const totalPrice = cart.reduce((total, product) => total + parseInt(product.precio), 0);

    // Separamos los productos del total
    y += 20;

    doc.text(`TOTAL: $${totalPrice}`, 20, y);

    const date = new Date();
    
    //importar nombre user
    const ticketName = `${userName}_${date.toISOString()}`

    //imprimimos ticket de venta
    doc.save(`${ticketName}.pdf`);

    registrarVenta(totalPrice, productosVenta);
}

async function registrarVenta(totalPrice, productosVenta) {
    try {
        const date = new Date();

        const formatDate = date.toISOString().slice(0, 19).replace("T", " ");

        const data = {
            fecha: formatDate,
            precio_total: totalPrice,
            nombre_cliente: userName,
            products: productosVenta
        }

        const response = await fetch(`${URL_BASE}/api/ventas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
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
    showExitMessage();
}

init();