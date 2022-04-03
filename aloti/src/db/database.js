const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'Aloti',
    user: 'root',
    password: '1234',
    port: '3308'
})

conexion.connect((error) => {
    if (error) {
        throw error
    } else {
        console.log("CONEXION HECHA");
    }
});

module.exports = conexion;
