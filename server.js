/*
    File: server.js
    Author: Heliton Lima
    Date: 17/07
    Description: Configuração do servidor
*/

const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);