import express from "express";
import environments from "./src/api/config/environments.js";
import conexion from "./src/api/database/db.js";
import cors from "cors";

const app = express();
const PORT = environments.port;

/*=====================
	Middlewares
=====================*/
app.use(cors()); //Permite las solicitudes 

app.use(express.json()) // Parseo de JSON recibido en el body de la request


/*=====================
	Endpoints 
=====================*/

//  Obtengo todos los productos.

app.get("/api/productos", async (_, res) => {
    const [juegos] = await conexion.query("SELECT * FROM juegos");
    const [consolas] = await conexion.query("SELECT * FROM consolas");

    const filas = juegos.concat(consolas); 

    res.status(200).json({
        payload: filas
    });
});


//  JUEGOS


// Obtengo todos los juegos.

app.get("/api/juegos", async(_,res)=>{
    const [filas] = await conexion.query("SELECT * FROM juegos");

    res.status(200).json({
        payload: filas
    });
});

// Objengo el juego por id

app.get("/api/juegos/:id", async(req, res)=>{
    const id = req.params.id;

    const sql = "SELECT * FROM juegos WHERE id = ?";
    const [filas] = await conexion.query(sql, [id]);
    
    res.status(200).json({
        payload: filas
    });
});



//  Guardado de un nuevo juego 

app.post("/api/juegos/crear", async (req,res)=>{
    const {nombre,precio,imagen,activo,genero,fecha_salida} = req.body;
    
    const sql = "INSERT INTO juegos (nombre, precio, imagen, activo, genero, fecha_salida) VALUES (?,?,?,?,?,?)";
    await conexion.query(sql, [nombre,precio,imagen,activo,genero,fecha_salida]);
    
    res.status(201).json({
        message: "Juego guardado."
    });    
});

// Modificación de un juego.

app.put("/api/juegos/modificar", async (req,res)=>{
    const {id,nombre,precio,imagen,activo,genero,fecha_salida} = req.body;
    const sql = "UPDATE juegos SET nombre = ?,precio = ?,imagen = ?,activo = ?,genero = ?,fecha_salida = ?";

    await conexion.query(sql, [id,nombre,precio,imagen,activo,genero,fecha_salida]);

    res.status(200).json({
        message: `Juego con id ${id} actualizado`
    })
})

/*
// Eliminación del juego indicado

app.delete("/api/juegos/:id", async (req, res)=>{
    const sql = "DELETE FROM juegos WHERE id = ?";
    const id = req.params.id;
    
    await conexion.query(sql,[id]);
    res.status(204);
});
*/


// CONSOLAS

// Obtengo todas las consolas.

app.get("/api/consolas", async(_,res)=>{
    const [filas] = await conexion.query("SELECT * FROM consolas");
    
    res.status(200).json({
        payload: filas
    });
});


// Obtengo la consola por su modelo.

app.get("/api/consolas/:modelo", async(req,res)=>{
    const modelo = req.params.modelo;
    
    const sql = "SELECT * FROM consolas WHERE modelo = ?";
    const [filas] = await conexion.query(sql, [modelo]);
    
    res.status(200).json({
        payload: filas
    });
})


//  Guardado de una nueva consola 

app.post("/api/consolas/crear", async (req,res)=>{
    const {modelo, marca, imagen, activo} = req.body;
    
    const sql = "INSERT INTO consolas (modelo, marca, imagen, activo) VALUES (?,?,?,?)";
    await conexion.query(sql, [modelo, marca, imagen, activo]);
    
    res.status(201).json({
        message: "Consola guardada."
    });
});

// Modificación de un juego.

app.put("/api/consolas/modificar", async (req,res)=>{
    const {modelo, marca, imagen,activo} = req.body;
    const sql = "UPDATE consolas SET modelo = ?, marca = ?,imagen = ?,activo = ?";

    await conexion.query(sql, [modelo, marca, imagen,activo]);

    res.status(200).json({
        message: `${modelo} actualizada`
    })
})

/*
// BORRADO DE LA CONSOLA INDICADA
app.delete("/api/consolas/:modelo", async (req, res)=>{
    const sqlConsolas = "DELETE FROM consolas WHERE modelo = ?";
    const sqlConsolasJuegos = "DELETE FROM juego_consola WHERE modelo_consola = ?";
    const modelo = req.params.modelo;
    
    await conexion.query(sqlConsolasJuegos,[modelo]);
    await conexion.query(sqlConsolas,[modelo]);
    res.status(204);
});
*/


// Para que el servidor siga detectando las nuevas peticiones
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});










