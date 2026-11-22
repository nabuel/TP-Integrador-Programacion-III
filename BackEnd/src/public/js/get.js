const contenedorProductos = document.getElementById("contenedor-productos");
const form = document.getElementById("formGetById");
const urlBase = "http://localhost:3000";

const deleteButtons = document.querySelectorAll(".delete-btn");
const modalProduct = document.getElementById("modalProducto")


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
  let mensajeHTML = !producto.activo
    ? `<div class="card-producto product-deactivated">`
    : `<div class="card-producto">`;

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
                        </div>`;

  contenedorProductos.innerHTML = mensajeHTML;
}

function renderForm(product) {
    
    modalProduct.innerHTML = `
    <h2>Modificar producto</h2>

    <form id="formProducto">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value="${product.nombre}" required>

        <label for="precio">Precio:</label>
        <input type="number" id="precio" name="precio" min="5000" value="${product.precio}" required>

        <label for="imagen">Imagen:</label>
        <input type="file" id="imagen" name="imagen">

        <label for="activo">Activo:</label>
        <select id="activo" name="activo" required>
        
        <option value="true">Activo</option>
        <option value="false">Inactivo</option>
        
        </select>

        <label for="categoria">Categoría:</label>
        <select id="categoria" name="categoria" required>

            <option value="Consola">Consola</option>
            <option value="Juego">Juego</option>
      
        </select>

        <button type="submit">Guardar cambios</button>
        <button type="button" id="btnCerrar">Cancelar</button>
    </form>
  `;

  // Seleccionar el valor actual (después de que existen las opciones)
  document.getElementById('activo').value = String(Boolean(product.activo));
  document.getElementById('categoria').value = product.categoria;
    console.log(product.categoria)
  document.getElementById('btnCerrar').addEventListener('click', () => modalProduct.close());

  modalProduct.showModal(); 
}

async function deleteProduct(id) {
  if (window.confirm("¿Desea eliminar el producto?")) {
    try {
      const response = await fetch(`${urlBase}/api/productos/${id}`, {
        method: "DELETE",
      });

      console.log(response.ok);
      if (!response.ok) {
        const result = await response.json();

        return mostrarMensaje("error", result.message);
      }

      window.location.reload();

      mostrarMensaje("exito", `se ha borrado el producto con id: ${id}`);
    } catch (error) {
      console.error(error);
    }
  }
}

function mostrarMensaje(estado, mensaje) {
  contenedorProductos.innerHTML = `
        <p class="mensaje ${estado}">${mensaje}</p>
    `;
}
