const mysql = require('mysql');

const pool = mysql.createPool({
    host:"localhost",
    user:"robin",
    password:"Richie@innit4",
    database:"EXpensifly_db"
});

module.exports = pool;
