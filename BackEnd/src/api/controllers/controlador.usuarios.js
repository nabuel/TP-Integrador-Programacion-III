import ModeloUsuarios from "../models/modelo.usuarios.js";

export const crearUsuario = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.render("register", {
                title: "test",
                message: "Los campos no pueden estar vacios"
            });
        }

        await ModeloUsuarios.insertarUsuario(email, password);

        res.render("register", {
            title: "Registrarse",
            exito: "Creaste el usuario con exito"
        });

    } catch (error) {
        console.log("Error en el registro de usuarios admin: ", error);

        res.status(500).json({
            message: "Error interno del servidor al crear usuario admin"
        });
    }
}