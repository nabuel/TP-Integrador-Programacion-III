const contenedorProductos = document.getElementById("contenedor-productos");
const form = document.getElementById("formGetById");
const urlBase = "http://localhost:3000";
const deleteButtons = document.querySelectorAll(".delete-btn")

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = event.target.idProducto.value.trim();
  buscarProducto(id);
});

/*=======================
        FUNCIONES
    =======================*/

async function buscarProducto(id) {
  try {
    const response = await fetch(`${urlBase}/api/productos/${id}`);
    const data = await response.json();
    const producto = data.payload[0];

    if (response.ok) {
      renderizarProducto(producto);
    } else {
      mostrarError(producto.mensaje);
    }
  } catch (error) {
    console.error(error);
  }
}

function mostrarError(error) {
  console.log(error);
  contenedorProductos.innerHTML = error;
}

/**
 * Agrega las cartas de los productos al html.
 * productos -> lista donde se encuentran los productos.
 */
function renderizarProducto(producto) {

    let mensajeHTML= !producto.activo ? `<div class="card-producto product-deactivated">` : `<div class="card-producto">`;
    
    mensajeHTML += `<img src="/img/${producto.imagen}" alt="${producto.nombre}" class="card-img">
                            <p class="nombre-prod font-large">${producto.nombre}</p>
                            <p class="precio-prod font-large">${producto.precio}$</p>
                            
                            <div class="iconos-acciones">
                                
                                <button class="delete-btn" onclick="deleteProduct(${producto.id})">
                                
                                    <img src="/img/icono-eliminar.png" alt="eliminar producto">
                                    
                                </button>

                                <button class="update-btn" onclick="updateProduct(${producto.id})">
                                
                                    <img src="/img/icono-modificar.png" alt="modificar producto">
                                    
                                </button>
                            
                            </div>
                        </div>`


    contenedorProductos.innerHTML = mensajeHTML;
}


async function deleteProduct(id){
    if (window.confirm("¿Desea eliminar el producto?")) {
        try{

            const response = await fetch(`${urlBase}/api/productos/${id}`, {
                method:"DELETE"
            })
            
            
            if (!response.ok){
                
                const result = await response.json();
                
                return mostrarMensaje("error", result.message);
                
            }

            mostrarMensaje("exito", `se ha borrado el producto con id: ${id}`);
        } catch (error){
            console.error(error);
        }
    }
}

function mostrarMensaje(estado, mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje ${estado}">${mensaje}</p>
    `;
}