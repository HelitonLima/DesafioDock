/*
    File: mysql.js
    Author: Heliton Lima
    Date: 19/07
    Description: Configuração da conexão com o banco de dados usando váriavel de ambiente
*/

const mysql = require('mysql');

var pool  = mysql.createPool({
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
});

exports.pool = pool;