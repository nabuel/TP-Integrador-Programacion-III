const messageContainer = document.getElementById("message-container");
const modifyForm = document.getElementById("formProducto");
const urlBase = "http://localhost:3000";

modifyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (window.confirm("¿Desea confirmar los cambios?")) {

        const inputImg = document.getElementById("productImg");

        const data = new FormData(event.target);

        if (inputImg.files.length > 0) {
            data.append("imagen", inputImg.files[0].name);
        }

        updateProduct(data);
    }

});

async function updateProduct(data) {
    try {

        const product = Object.fromEntries(data.entries());

        product.productPrice = Number(product.productPrice);
        product.productName = product.productName.trim();
        product.productActive = product.productActive == "false" ? false : true;

        const response = await fetch(`${urlBase}/api/productos`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });

        // la parseo

        const result = await response.json();


        if (!response.ok) {
            return mostrarMensaje("error", result.message)
        }

        mostrarMensaje("exito", result.message)


    } catch (error) {
        console.log("Error enviando modificacion del producto: ", error);
    }
}

function mostrarMensaje(estado, mensaje) {
    messageContainer.innerHTML = `
        <p class="mensaje ${estado}">${mensaje}</p>
    `;
}