const USERNAME = sessionStorage.getItem("nombreUsuario");
const btnSalir = document.getElementById("boton-salir");

/**
 * mainCart: es el carrito logico principal.
 * secondCart: es el carrito secundario que se diferencia del principal por solo contener los productos no repetidos.
*/
let mainCart = JSON.parse(sessionStorage.getItem("productosCarrito"));
const secondCart = [];
const URL_BASE = "http://localhost:3000";

const printButton = document.getElementById("boton-imprimir");

printButton.addEventListener("click", () => {

    printTicket();
    window.location.replace("bienvenida.html");
});

btnSalir.addEventListener("click", () => {

    deleteSession();
    window.location.replace("bienvenida.html");
});

function showByeMessage() {
    const exitMessage = document.getElementById("mensaje-agradecimiento");

    exitMessage.innerText += `¡Gracias por tu compra, ${USERNAME}, vuelva prontos!`;
}

function deleteSession() {
    sessionStorage.removeItem("nombreUsuario");
    sessionStorage.removeItem("productosCarrito");
}

/**
 * Esta es la lista que almacena los datos necesarios para hacer el INSERT en la tabla de productos_ventas. 
 * Estos campos necesarios son: id, nombre, cantidad, precio_unitario.
*/
const productsSales = [];
const totalPrice = mainCart.reduce((total, product) => total + parseInt(product.precio), 0);

function getDatesOfSales() {

    mainCart.forEach(product => {

        const existente = productsSales.find(p => p.id === product.id);

        if (existente) {
            existente.cantidad++;
        } else {
            productsSales.push({
                id: product.id,
                nombre: product.nombre,
                cantidad: 1,
                precio_unitario: product.precio
            });
        }
    });
}


async function registerSale(totalPrice, products) {
    try {
        const date = new Date();

        const formatDate = date.toISOString().slice(0, 19).replace("T", " ");

        const data = {
            fecha: formatDate,
            precio_total: totalPrice,
            nombre_cliente: USERNAME,
            products: products
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
            alert(`${result.message}`);
        }
    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert(`${result.message}`);
    }
};

function printTicket() {

    /**
     * https://github.com/parallax/jsPDF
       https://parallax.github.io/jsPDF/docs/ */


    // Gracias a CDN extraemos la clase jspdf del objeto global window
    const { jsPDF } = window.jspdf;

    // Creamos una nueva instancia del document pdf usando la clase jsPDF
    const doc = new jsPDF(); // Ahora doc contendra todos los metodos para poder crear un ticket

    let y = 20; // establecemos margen superior de 20 pix en el eje vertical.

    doc.setFontSize(20); // establecemos el tamaᇸo fuente del titulo

    doc.text("ticket-rappigames", 20, y); // definimos titulo del ticket

    y += 20;

    doc.setFontSize(14); // reducimos tam. fuente para imprimir prod. del ticket.

    productsSales.forEach(producto => {

        doc.text(`${producto.cantidad}x ${producto.nombre} - ${producto.precio_unitario}`, 20, y);

        y += 5;
    });


    // Separamos los productos del total
    y += 20;

    doc.text(`TOTAL: $${totalPrice}`, 20, y);

    const date = new Date();

    //importar nombre user
    const ticketName = `${USERNAME}_${date.toISOString()}`

    //imprimimos ticket de venta
    doc.save(`${ticketName}.pdf`);

}


function init() {
    showByeMessage();
    getDatesOfSales();
    registerSale(totalPrice, productsSales);
    deleteSession();
}

init();