const contenedorProductos = document.getElementById("contenedor-productos");
        const contenedorProductosById = document.getElementById("get-producto-by-id");
        const form = document.getElementById("formGetById");

        const urlBase = "http://localhost:3000"
        
        
        form.addEventListener("submit", async event =>{
            event.preventDefault();
            
            const id = event.target.idProducto.value.trim();
            buscarProducto(id);
        })
        

    /*=======================
        FUNCIONES
    =======================*/
        async function buscarProductos() {
            
            try{
                // Hago la request a la api para obtener todos los productos.
                const response = await fech(`${urlBase}/api/productos`);
                
                // Envío la response de la request y lo convierto en un json. 
                renderizarProductos(await response.json());

            } catch (error) {
                console.error(error);
            }
        }

        async function buscarProducto(id){
            
            try{
                
                const response = await fetch(`${urlBase}/api/productos/${id}`);
                const productos = await response.json();
                
                if (response.ok){
                    renderizarProductos(productos);
                }else{
                    mostrarError(productos.mensaje)
                }
    
    
            }catch (error){
                console.error(error);
            }
        }

        function renderizarProductos(productos){
            let productosHTML = "";

            productos.payload.forEach(producto => {
                productosHTML += `<div class="card-producto">
                                                <img src="./img/${producto.imagen}" alt="${producto.nombre}">
                                                <p class="nombre-prod">${producto.nombre}</p>
                                                <p class="precio-prod">${producto.precio}$</p>
                                            </div>`;
            })
            
            contenedorProductos.innerHTML = productosHTML;
        }
        
        function mostrarError(error){
            console.log(error);
            contenedorProductos.innerHTML = error;
        }