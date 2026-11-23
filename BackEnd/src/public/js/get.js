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
    const product = data.payload[0];

    if (response.ok) {
      contenedorProductos.innerHTML = structureProductCard(product);
    } else {
      showMessage("error", producto.message);
    }
  } catch (error) {
    console.error(error);
  }
}


/**
 * Crea la estructura de la carta del producto indicado 
 * @param {*} product producto de donde se saca la información
 * @returns la estructura para renderizar el producto.
 */

function structureProductCard(product){
    let mensajeHTML = !product.activo
    ? `<div class="card-producto product-deactivated">`
    : `<div class="card-producto">`;

  mensajeHTML += `<img src="/img/${product.imagen}" alt="${product.nombre}" class="card-img">
                            <p class="nombre-prod font-large">${product.nombre}</p>
                            <p class="precio-prod font-large">${product.precio}$</p>
                            
                            <div class="iconos-acciones">
                                
                                <button class="delete-btn" onclick="deleteProduct(${product.id})">
                                
                                    <img src="/img/icono-eliminar.png" alt="eliminar producto">
                                    
                                </button>

                                <button class="update-btn" onclick='renderForm(${JSON.stringify(product)})'>
                                
                                    <img src="/img/icono-modificar.png" alt="modificar producto" >
                                    
                                </button>
                            
                            </div>
                        </div>`;
  
  return mensajeHTML;
}

/**
 * Renderiza el formulario para actualizar un producto.
 * @param {*} product producto el cual será actualizado
 */
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
        <button type="button" id="btnCerrar" onclick="modalProduct.close()">Cancelar</button>
    </form>
  `;

  // Seleccionar el valor actual (después de que existen las opciones)
  document.getElementById('activo').value = String(Boolean(product.activo));
  document.getElementById('categoria').value = product.categoria;
  
  document.getElementById("formProducto").addEventListener("submit", event =>{
    
    event.preventDefault();
    
    if(window.confirm("¿Desea confirmar los cambios?")){
      
      const inputImg = document.getElementById("imagen");
      
      const data = new FormData(event.target);
      

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

    product.precio = Number(product.precio);
    product.nombre = product.nombre.trim();
    product.activo = product.activo == "false" ? false : true;
    

    const response = await fetch(`${urlBase}/api/productos`, {
      method : "PUT",
      headers: {
                "Content-Type": "application/json"
            },
      body: JSON.stringify(product)
    });
    
    const result = await response.json();

    if(!response.ok){
      return showMessage("error", result.message)
    }

    showMessage("exito", result.message)
  
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

      if (!response.ok) {
        const result = await response.json();

        return showMessage("error", result.message);
      }

      showMessage("exito", `se ha borrado el producto con id: ${id}`);
      
      window.location.reload();
    
    } catch (error) {
      console.error(error);
    }
  }
}


async function applyCategoryFilter() {
  const filter = document.getElementById("category-filter");
  
  
  if (filter.value != "todos") {
    const response = await fetch(`${urlBase}/api/productos/categoria/${filter.value}`);
    
    const data = await response.json();
    
    if (!response.ok) {
      return showMessage("error", data.message);
    }
    
    let productsHTML = "";
    
    data.payload.forEach((p) => (productsHTML += structureProductCard(p)));
    
    contenedorProductos.innerHTML = productsHTML;
    
  } else {
    window.location.reload();
  }
}

async function applyAvailableFilter() {
  const filter = document.getElementById("available-filter");

  if (filter.value != "default") {
    const avaible = filter.value == "false" ? false : true;

    const response = await fetch(`${urlBase}/api/productos/activos/${avaible}`);

    const data = await response.json();

    if (!response.ok) {
      return showMessage("error", data.message);
    }

    let productsHTML = "";

    data.payload.forEach((p) => (productsHTML += structureProductCard(p)));

    contenedorProductos.innerHTML = productsHTML;
  } else {
    window.location.reload();
  }
}
/**
 * Renderiza el formulario para crear un nuevo producto
*/
function renderForm() {
    modalProduct.innerHTML = `
      <h2>Modificar producto</h2>
   
      <form id="formProducto" enctype="multipart/form-data">
   
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required>
   
        <label for="precio">Precio:</label>
        <input type="number" id="precio" name="precio" min="5000" required>
   
        <label for="imagen">Imagen:</label>
        <input type="file" id="imagen" name="imagen" required>
   
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
        <button type="button" id="btnCerrar" onclick="modalProduct.close()">Cancelar</button>
      </form>
      `;

  document.getElementById("formProducto")
          .addEventListener("submit", (event) => {
              event.preventDefault();

            if (window.confirm("¿Desea crear un nuevo producto?")) {
              const inputImg = document.getElementById("imagen");

              const data = new FormData(event.target);
              data.append("imagen", inputImg.files[0].name);

              createProduct(data);

              modalProduct.close();
            }
          });

  modalProduct.showModal();
}

function showMessage(estado, mensaje) {
      contenedorProductos.innerHTML = `
          <p class="mensaje ${estado}">${mensaje}</p>
      `;
}