import ModeloUsuarios from "../models/modelo.usuarios.js";
import ModeloLogin from "../models/modelo.login.js";
import bcrypt from "bcrypt";

/**
 * Funcion flecha que contiene la logica del endpoint '/api/usuarios/registrar'. 
 * El algoritmo contiene 'bcrypt' que se encarga de hashear las claves.
 * @param {*} req: Solicitud HTTP.
 * @param {*} res: Respuesta HTTP.
 */
export const crearUsuario = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.render("register", {
                title: "Registrar usuario",
                about: "Creacion de usuario administrador",
                error: "Los campos no pueden estar vacios"
            });
        } else if (password.length < 4 || password.length > 12) {
            return res.render("register", {
                title: "Registrar usuario",
                about: "Creacion de usuario administrador",
                error: "La contraseña debe tener entre 3 y 12 caracteres"
            });
        }

        const [user] = await ModeloLogin.selectUserAdmin(email);

        if (user.length > 0) {
            return res.render("register", {
                title: "Registrar usuario",
                about: "Creacion de usuario administrador",
                error: "El mail que ingresaste ya esta en uso"
            });
        }

        /*
         Indicamos las rondas de sal y ciframos el password recibido en el req.body
         */

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await ModeloUsuarios.insertarUsuario(name, email, hashedPassword);

        res.render("register", {
            title: "Registrar usuario",
            about: "Creacion de usuario administrador",
            exito: "El usuario administrador se creo correctamente"
        });

    } catch (error) {
        console.log("Error en el registro de usuarios admin: ", error);

        res.status(500).json({
            message: "Error interno del servidor al crear usuario admin"
        });
    }

}

/**
 * Funcion flecha que contiene la logica del endpoint '/registrar'.
 * @param {*} _: Solicitud HTTP. No se utiliza.
 * @param {*} res: Respuesta HTTP.
 */
export const vistaRegistrar = (_, res) => {
    res.render("register", {
        title: "Registrar usuario",
        about: "Creacion de usuario administrador",
    });
}