/*
    File: app.js
    Author: Heliton Lima
    Date: 17/07
    Description: Exportação da aplicação
*/

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaConta = require('./routes/conta');
const rotaTransacao = require('./routes/transacao');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/conta', rotaConta);
app.use('/transacao', rotaTransacao);

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;