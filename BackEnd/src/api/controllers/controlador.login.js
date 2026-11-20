import ModeloLogin from "../models/modelo.login.js";
import bcrypt from "bcrypt";

/**
 * Controlador que atiende la url de /login y renderiza la vista.
 * @param {*} _ Por convencion, ya que no vamos a utilizar la request.
 * @param {*} res Parametro que toma el valor de la response.
 */
export const vistaLogin = (_, res) => {
    res.render("login", {
        title: "Login de admin"
    });
}

/**
 * Controlador que atiende la url de /login pero con el metodo HTTP: POST.
 * @param {*} req Request
 * @param {*} res Response
 */
export const loginUserAdmin = async (req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    /**
     * Evitamos consulta innecesaria a la base de datos
     */
    if (!email || !password) {
        return res.render("login", {
            title: "Login Admin",
            about: "Introduzca sus credenciales",
            error: "Todos los campos son obligatorios"
        });
    }

    const [rows] = await ModeloLogin.selectUserAdmin(email);

    if (rows.length === 0) {
        return res.render("login", {
            title: "Login Admin",

        });
    }

    const user = rows[0];

    /**
     * Esta asignación guarda información dentro de la sesión del usuario.
     * Estamos estableciendo explícitamente que esa sesión corresponde a un usuario autenticado.
     */
    req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email
    }

    res.redirect("/dashboard/principal");
}

export const logoutUserAdmin = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log("Error al destruir la sesion", err);
            return res.status(500).json({
                message: "Error al destruir la sesion"
            });
        }

        res.redirect("/login");
    });
}

export const registrarDesdeLogin = (_, res) => {
    res.render("register", {
        title: "test"
    });
}