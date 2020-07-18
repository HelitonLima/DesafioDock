/*
    File: transacao.js
    Author: Heliton Lima
    Date: 18/07
    Description: Rota transaçãos
*/

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Transações'
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