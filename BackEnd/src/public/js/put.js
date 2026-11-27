const messageContainer = document.getElementById("message-container");
const modifyForm = document.getElementById("formProducto");
const urlBase = "http://localhost:3000";

modifyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (window.confirm("¿Desea confirmar los cambios?")) {

        const inputImg = document.getElementById("productImg");
        const currentProductImg = document.getElementById("currentProductImg");

        const data = new FormData(event.target);

        if (inputImg.files.length > 0) {
            data.append("productImg", inputImg.files[0].name);
        } else {
            data.append("productImg", currentProductImg.value);
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
            return showMessage("error", result.message)
        }

        showMessage("exito", result.message)


    } catch (error) {
        console.log("Error enviando modificacion del producto: ", error);
    }
}

function showMessage(estado, mensaje) {
    messageContainer.innerHTML = `
        <p class="${estado} centrado font-30">${mensaje}</p>
    `;
}