
const mysql = require('mysql2');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'Kashish@12'
});

module.exports = mysqlConnection;