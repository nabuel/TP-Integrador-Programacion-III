import connection from "../database/db.js";

const selectUserAdmin = (email) => {
    const sql = "SELECT * FROM administradores WHERE email = ?";
    return connection.query(sql, email);
}

export default {
    selectUserAdmin
}