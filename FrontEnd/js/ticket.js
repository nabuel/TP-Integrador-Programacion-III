const nombreUser = sessionStorage.getItem("nombreUsuario");
let cart = JSON.parse(sessionStorage.getItem("productosCarrito")); // test

const botonImprimir = document.getElementById("boton-imprimir");

botonImprimir.addEventListener("click", () => {
    // event.preventDefault();

    imprimirTicket();
});

function mostrarMensajeAgradecimiento(){
    const contenedorAgradecimiento = document.getElementById("mensaje-agradecimiento");

    contenedorAgradecimiento.innerText += ` ${nombreUser}!`;
}

function imprimirTicket() {

    /**
     * https://github.com/parallax/jsPDF
       https://parallax.github.io/jsPDF/docs/ */

    const idProducts = [];

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

        idProducts.push(product.id); // llenamos array de ids prouctos para crear la venta dsp

        doc.text(`${product.nombre} - ${product.precio}`, 20, y);

        y += 5;
    });


    const precioTotal = cart.reduce((total, producto) => total + parseInt(producto.precio), 0);

    // Separamos los productos del total
    y += 20;

    doc.text(`TOTAL: $${precioTotal}`, 20, y);

    const fecha = new Date();
    //importar nombre user
    const nombreTicket = `${nombreUser}_${fecha.toISOString()}`

    //imprimimos ticket de venta
    doc.save(`${nombreTicket}.pdf`);
}

async function registrarVenta(totalPrice, idProducts) {
    try {
        const fecha = new Date();

        const fechaFormato = fecha.toISOString().slice(0, 19).replace("T", " ");

        const data = {
            date: fechaFormato,
            total_price: totalPrice,
            user_name: nombreUser,
            products: idProducts
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

            window.location.href = "index.html";
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