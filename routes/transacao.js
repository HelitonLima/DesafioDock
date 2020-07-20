/*
    File: transacao.js
    Author: Heliton Lima
    Date: 18/07
    Description: Rota transaçãos
*/

const express = require('express');
const router = express.Router();

router.get('/consultarTransacoes', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM transacao',
            (error, result, field) => {
                if(error) { return res.status(500).send({ error: error})}
                return res.status(200).send({response: result})
            }
        )
    });
});

router.get('/consultarTransacao:idConta', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM transacao WHERE idConta = ?',
            [req.params.idConta],
            (error, result, field) => {
                if(error) { return res.status(500).send({ error: error})}
                return res.status(200).send({response: result})
            }
        )
    });
});

router.post('/', (req, res, next) => {
    const transacao = {
        idConta: req.body.idConta,
        descricao: req.body.descricao,
        valor: req.body.valor,
        dataTransacao: req.body.dataTransacao
    }

    res.status(201).send({
        
        mensagem: 'Inserindo uma transação',
        transacaoCriada: transacao
    })
});

module.exports = router;