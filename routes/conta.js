/*
    File: conta.js
    Author: Heliton Lima
    Date: 18/07
    Description: Rota conta
*/

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Todas as contas'
    });
});

router.post('/', (req, res, next) => {
    const conta = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        idConta: req.body.idConta,
        saldo: req.body.saldo,
        flagAtivo: req.body.flagAtivo,
        dataCriacao: req.body.dataCriacao
    }

    res.status(201).send({
        mensagem: 'Criando uma conta',
        contaCriada: conta
    })
});

router.get('/:idConta', (req, res, next) => {
    const id = req.params.idConta
    res.status(200).send({
        id: id
    })
});

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Alterando dados de uma conta'
    })
})

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Excluindo uma conta'
    })
})


module.exports = router;