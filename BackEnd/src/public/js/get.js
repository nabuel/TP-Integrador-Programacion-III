const contenedorProductos = document.getElementById("contenedor-productos");
const form = document.getElementById("formGetById");
const urlBase = "http://localhost:3000";

const deleteButtons = document.querySelectorAll(".delete-btn");
const modalProduct = document.getElementById("modalProduct");


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

                                <button class="update-btn" onclick='renderForm(${JSON.stringify(producto)})' >
                                
                                    <img src="/img/icono-modificar.png" alt="modificar producto" >
                                    
                                </button>
                            
                            </div>
                        </div>`;

  contenedorProductos.innerHTML = mensajeHTML;
}

function renderForm(product) {
    
    modalProduct.innerHTML = `
    <h2>Modificar producto</h2>

    <form id="formProducto" enctype="multipart/form-data">
    
      <input name="id" id="${product.id}" value="${product.id}" hidden>
        
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
  document.getElementById('btnCerrar').addEventListener('click', () => modalProduct.close());
  
  document.getElementById("formProducto").addEventListener("submit", event =>{
    
    event.preventDefault();
    if(window.confirm("¿Desea confirmar los cambios?")){
      
      const inputImg = document.getElementById("imagen");
      
      const data = new FormData(event.target);
      
      // Obtengo el nombre del archivo cargado
      // if(inputImg.files.lenght > 0){
        
      //   data.append("imagen", inputImg.files[0].name);  //  Lo agrego a los datos del form
      // }

      inputImg.files.length > 0 ? data.append("imagen", inputImg.files[0].name) : data.append("imagen", product.imagen);
      
      
      updateProduct(data);
      
      modalProduct.close();
    } 
  
  })

  modalProduct.showModal(); 
}

async function updateProduct(data){
  try{
  
    const product = Object.fromEntries(data.entries());
    console.log("Antes de parsear: ", product.activo);

    product.precio = Number(product.precio);
    product.nombre = product.nombre.trim();
    product.activo = product.activo == "false" ? false : true;
    product.id = Number(product.id);
    
    console.log("Despues de parsear: ",product.activo)

    const response = await fetch(`${urlBase}/api/productos`, {
      method : "PUT",
      headers: {
                "Content-Type": "application/json"
            },
      body: JSON.stringify(product)
    });
    
    const result = await response.json();

    if(!response.ok){
      return mostrarMensaje("error", result.message)
    }

    mostrarMensaje("exito", result.message)
  
  } catch (error){
    console.error(error);
  }
}


async function deleteProduct(id) {
  if (window.confirm("¿Desea eliminar el producto?")) {

    try {
      const response = await fetch(`${urlBase}/api/productos/${id}`, {
        method: "DELETE"
      });

      console.log(response.ok);
      if (!response.ok) {
        const result = await response.json();

        return mostrarMensaje("error", result.message);
      }

      mostrarMensaje("exito", `se ha borrado el producto con id: ${id}`);
      
      window.location.reload();
    
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
