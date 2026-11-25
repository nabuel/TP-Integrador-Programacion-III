const contenedorProductos = document.getElementById("contenedor-productos");
const form = document.getElementById("formGetById");
const URL_BASE = "http://localhost:3000";


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = event.target.productId.value.trim();
  buscarProducto(id);
});

/*=======================
        FUNCIONES
=======================*/

/**
 * Busca el producto por el id recibido.
 * @param {*} id id del producto a que se desea obtener
 */
async function buscarProducto(id) {
  try {
    
    let product = await executeFetch(`${URL_BASE}/api/productos/${id}`);
    
    if(product){
      
      product = product.payload[0]
      
      contenedorProductos.innerHTML = structureProductCard(product);
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
    let messageHTML = !product.activo ? `<div class="card-producto product-deactivated">`
    : `<div class="card-producto">`;

  messageHTML += `<img src="/img/${product.imagen}" alt="${product.nombre}" class="card-img">
                            <p class="nombre-prod font-large">${product.nombre}</p>
                            <p class="precio-prod font-large">${product.precio}$</p>
                            
                            <div class="iconos-acciones">
                                
                                <button class="delete-btn" onclick="deleteProduct(${product.id})">
                                
                                    <img src="/img/icono-eliminar.png" alt="eliminar producto">
                                    
                                </button>

                                <button class="update-btn" onclick='window.location.assign("principal/modificar/producto/${product.id}")'>
                                
                                    <img src="/img/icono-modificar.png" alt="modificar producto" >
                                    
                                </button>
                            
                            </div>
                        </div>`;
  
  return messageHTML;
}

/**
 * Elimina el producto indicado de la BD.
 * @param {*} id id del producto que se quiere eliminar
*/
async function deleteProduct(id) {
  if (window.confirm("¿Desea eliminar el producto?")) {

    try {
      const response = await fetch(`${URL_BASE}/api/productos/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const result = await response.json();

        showMessage("error", result.message);
        
        return; 
      }
      
      window.alert(`se ha borrado el producto con id: ${id}`);
      
      window.location.reload();
    
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 * Aplica los filtros para ver los productos según su categoria
 */
async function applyCategoryFilter() {
  const categoryFilter = document.getElementById("category-filter");  
  const filterValue = categoryFilter.value;
  
  if(filterValue == "default"){
    window.location.reload();
    return;
  }

  const data = await executeFetch(`${URL_BASE}/api/productos/categoria/${filterValue}`);
  
  if(data) renderProductList(data.payload);
}

/**
 * Ejecuta una petición fetch a la url indicada. En caso de que la petición no sea exitosa se muestra un mensaje.
 * @param {*} url url a la cual se va a realizar la petición Get.
 * @returns {Promise} una promesa la cual son los datos parseados como JSON de la response
*/
async function executeFetch(url){
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    showMessage("error", data.message);
    return;
  }

  return data;
}

/**
 * Aplica los filtros para ver los productos activos o inactivos
 */
async function applyAvailableFilter() {
  const avaibleFilter = document.getElementById("available-filter");
  const filterValue = avaibleFilter.value;

  if(filterValue == "default") {
    window.location.reload();
    return;
  }
  
  const available = filterValue == "false" ? false : true;

  const data = await executeFetch(`${URL_BASE}/api/productos/activos/${available}`);
    
  if(data) renderProductList(data.payload);
}

/**
 * Aplica los filtros de ordenamiento
 */
async function applySortFilter(){
  const sortFilter = document.getElementById("sort-filter");
  const sortValue = sortFilter.value;

  if(sortValue == "default"){
    window.location.reload();
    return;
  } 
  
  let attribute;
  let order;
  
  (sortValue == "a-z" || sortValue == "z-a" ) ? attribute = "nombre" : attribute = "precio";
  (sortValue == "a-z" || sortValue == "ascendente") ? order = "asc" : order = "desc";

  let url = `${URL_BASE}/api/productos/${order}/${attribute}`;

  const data = await executeFetch(url);
  
  if(data) renderProductList(data.payload);
}

/**
 * Renderiza los productos de la lista
 * @param {*} products lista de productos a renderizar 
 */
function renderProductList(products){
  let productsHTML = "";

  products.forEach(p => (productsHTML += structureProductCard(p)));

  contenedorProductos.innerHTML = productsHTML;
}

/**
 * Renderiza el mensaje informativo.  
 * @param {*} estado estado de la petición 
 * @param {*} mensaje mensaje informatico para el usuario
 */
function showMessage(estado, mensaje) {
  contenedorProductos.innerHTML = `<p class="mensaje ${estado}">${mensaje}</p>`;
}