const VALID_FORMAT = ".webp";
const urlBase = "http://localhost:3000";
const messageContainer = document.getElementById("message-container");

/**
 * Renderiza el formulario para crear un nuevo producto
 */
function prepareData() {
    document
    .getElementById("formProducto")
    .addEventListener("submit", (event) => {
        event.preventDefault();

        if (window.confirm("¿Desea crear un nuevo producto?")) {
            const inputImg = document.getElementById("productImg");

            const data = new FormData(event.target);
            data.append("productImg", inputImg.files[0].name);

            createProduct(data);
        }
    });
}

async function createProduct(data) {
  try {
    const product = Object.fromEntries(data.entries());

    product.productName = product.productName.trim();
    product.productPrice = Number(product.productPrice);
    product.productActive = product.productActive == "false" ? false : true;
    console.table(product)
    const errors = validateData(product);
    
    if(errors.length > 0){
        return errors.forEach(e => showMessage("error", e));
    }

    const response = await fetch(`${urlBase}/api/productos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
    });

    const result = await response.json();

    if (!response.ok) {
      return showMessage("error", result.message);
    }

    showMessage("exito", result.message);
  } catch (error) {
    console.error(error);
  }
}

function validateData(data){
    const errors = [];

    if(data.productName.length < 2){
        errors.push("El nombre del producto debe contener al menos 3 caracteres.");
    }
    
    
    if(!data.productImg.includes(VALID_FORMAT)){
        errors.push(`El archivo de la imagen debe terminar en ${VALID_FORMAT}`)
    }


    return errors;

}


function showMessage(estado, mensaje) {
    messageContainer.innerHTML = `<p class="mensaje ${estado}">${mensaje}</p>`;
}