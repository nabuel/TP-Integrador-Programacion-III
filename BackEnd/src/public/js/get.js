const contenedorProductos = document.getElementById("contenedor-productos");
const form = document.getElementById("formGetById");
const urlBase = "http://localhost:3000";
        
form.addEventListener("submit", async event =>{
    event.preventDefault();
            
    const id = event.target.idProducto.value.trim();
    buscarProducto(id);
})
        

    /*=======================
        FUNCIONES
    =======================*/

        async function buscarProducto(id){
            
            try{
                
                const response = await fetch(`${urlBase}/api/productos/${id}`);
                const data = await response.json();
                const producto = data.payload[0];
                console.log(producto)
                if (response.ok){
                    renderizarProducto(producto);
                }else{
                    mostrarError(producto.mensaje)
                }
    
    
            }catch (error){
                console.error(error);
            }
        }

        function mostrarError(error){
            console.log(error);
            contenedorProductos.innerHTML = error;
        }


        /**
         * Agrega las cartas de los productos al html.
         * productos -> lista donde se encuentran los productos.
        */
        function renderizarProducto(producto) {
            let productosHTML = `<div class="card-producto">
                                    <img src="/img/${producto.imagen}" alt="${producto.nombre}">
                                    <p class="nombre-prod">${producto.nombre}</p>
                                    <p class="precio-prod">${producto.precio}$</p>
                                </div>`;
            
            contenedorProductos.innerHTML = productosHTML;
        }


