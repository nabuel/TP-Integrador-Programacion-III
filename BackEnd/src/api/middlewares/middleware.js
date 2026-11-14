function validarId(req, res, next){
    // 1. Obtengo el id y lo convierto a un número
    const id = Number(req.params.id);

    // 2. Valida que sea un número entero y mayor a 0.
    if(!Number.isInteger(id) || id <= 0){
        res.status(404).json({
            mensaje : "El id es inválido"
        })
    };

    req.id = id;
    next();
}

function validarProducto(req, res, next){
    const {nombre, imagen, precio, activo, categoria} = req.body;
    const errores = [];


    if(!nombre, !imagen, !precio, !activo, !categoria) errores.push("Campos faltantes");

    if(typeof nombre !== "string" || nombre.trim().length < 2) errores.push('El nombre del producto debe contener al menos 2 caracteres');
    
    if (typeof precio !== "number" || precio <= 0) errores.push("El precio debe ser mayor a 0");

    if(errores.length > 0){
        return res.status(400).json({
            mensaje :"Error con los datos ingresados", 
            errores : errores
        });
    };

    next();
}

export{
    validarId,
    validarProducto
}