import connection from "../database/db.js";


/**
 * Funcion flecha que hace la 'query' a la base de datos.
 * @param {*} email: se recibe desde el controlador.
 * @param {*} password: " "     " "
 * @returns Promise
 */
const insertarUsuario = (name, email, password) => {
    const sql = `INSERT INTO administradores (name, email, password)
                 VALUES (?, ?, ?);`;
    return connection.query(sql, [name, email, password]);
}

export default {
    insertarUsuario
}