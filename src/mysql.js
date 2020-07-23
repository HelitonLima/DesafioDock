/*
    File: mysql.js
    Author: Heliton Lima
    Date: 19/07
    Description: Configuração da conexão com o banco de dados usando váriavel de ambiente
*/
require("dotenv").config({
    path: process.env.NODE_ENV === "DESENVOLVIMENTO" ? ".env" : ".env.test"
  });

const mysql = require('mysql');

var pool  = mysql.createPool({
    "user": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
});

exports.pool = pool;