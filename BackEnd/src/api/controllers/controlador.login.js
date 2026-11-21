import ModeloLogin from "../models/modelo.login.js";
import bcrypt from "bcrypt";

/**
 * Controlador que atiende la url de /login y renderiza la vista.
 * @param {*} _ Por convencion, ya que no vamos a utilizar la request.
 * @param {*} res Parametro que toma el valor de la response.
 */
export const vistaLogin = (_, res) => {
    res.render("login", {
        title: "Inicie sesion",
        about: "Introduzca sus credenciales",
    });
}

/**
 * Controlador que atiende la url de /login pero con el metodo HTTP: POST.
 * @param {*} req Request
 * @param {*} res Response
 */
export const loginUserAdmin = async (req, res) => {
    try {
        console.log(req.body);

        const { email, password } = req.body;

        /**
         * Evitamos consulta innecesaria a la base de datos
         */
        if (!email || !password) {
            return res.render("login", {
                title: "Inicie sesion",
                about: "Introduzca sus credenciales",
                error: "Todos los campos son obligatorios"
            });
        }

        const [rows] = await ModeloLogin.selectUserAdmin(email);

        if (rows.length === 0) {
            return res.render("login", {
                title: "Inicie sesion",
                about: "Introduzca sus credenciales",
                error: "No existe ese usuario registrado"
            });
        }

        const user = rows[0];

        /*
        Cuando tenemos el usuario ya en memoria hasheamos su clave y la comparamos con la clave de la BD para que pueda ingresar.
        */
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            /*
             Esta asignación guarda información dentro de la sesión del usuario.
             Estamos estableciendo explícitamente que esa sesión corresponde a un usuario autenticado.
             */
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
            }

            res.redirect("/dashboard/principal");
        } else {
            return res.render("login", {
                title: "Inicie sesion",
                about: "Introduzca sus credenciales",
                error: "Clave incorrecta"
            });
        }


    } catch (error) {
        console.log("Error en el login: ", error);

        res.status(500).json({
            mensaje: "Error interno del servidor al hacer login."
        });
    }
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