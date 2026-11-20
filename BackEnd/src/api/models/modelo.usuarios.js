import connection from "../database/db.js";

const insertarUsuario = (email, password) => {
    const sql = `INSERT INTO administradores (email, password)
                 VALUES (?, ?);`;
    return connection.query(sql, [email, password]);
}

export default {
    insertarUsuario
}