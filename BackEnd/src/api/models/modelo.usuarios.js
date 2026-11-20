import connection from "../database/db.js";


/**
 * Funcion flecha que hace la 'query' a la base de datos.
 * @param {*} email: se recibe desde el controlador.
 * @param {*} password: " "     " "
 * @returns Promise
 */
const insertarUsuario = (email, password) => {
    const sql = `INSERT INTO administradores (email, password)
                 VALUES (?, ?);`;
    return connection.query(sql, [email, password]);
}

export default {
    insertarUsuario
}