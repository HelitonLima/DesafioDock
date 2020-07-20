/*
    File: transacao.js
    Author: Heliton Lima
    Date: 18/07
    Description: Rota transaçãos
*/

const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/consultarTransacoes', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM vwTransacao',
            (error, result, field) => {
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    quantidade: result.length,
                    transacoes: result.map(transacao => {
                        return {
                            idConta: transacao.idConta,
                            descricao: transacao.descricao,
                            valor: transacao.valor,
                            dataTransacao: transacao.dataTransacao,
                            request: {
                                tipo: 'GET',
                                descricao: 'Exibir todos detalhes da conta dessa transação',
                                url: 'http://localhost:3000/conta/consultarConta/' + transacao.idConta
                            }
                        }
                    })
                }
                return res.status(200).send({response})
            }
        )
    });
});

router.get('/consultarTransacao/:idConta', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM vwTransacao WHERE idConta = ?',
            [req.params.idConta],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Esta conta não existe'
                    })
                }
                const response = {
                    transacoes: {
                        descricao: result[0].descricao,
                        valor: result[0].valor,
                        dataTransacao: result[0].datadataTransacao,
                        request: {
                            tipo: 'GET',
                            descricao: 'Exibir todas transações realizadas',
                            url: 'http://localhost:3000/transacao/consultarTransacoes'
                        }
                    }
                }
                return res.status(200).send({response: result})
            }
        )
    });
});

router.patch('/depositar', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            `UPDATE conta SET saldo = saldo + ` + req.body.valor + ` WHERE idConta = ?;`,
            [req.body.idConta],
            (error, result, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Depósito feito com sucesso!',
                    deposito:{
                        valor: req.body.valor,
                        request: {
                            tipo: 'GET',
                            descricao: 'Exibir todas as transações dessa conta',
                            url: 'http://localhost:3000/transacao/consultarTransacao/' + req.body.idConta
                        }
                    }
                }
                return res.status(202).send({response});
            }
        );
        conn.query(
            'INSERT INTO transacao (idConta, descricao, valor, dataTransacao) VALUES (?,?,?,?)',
            [req.body.idConta, req.body.descricao, req.body.valor, req.body.dataTransacao],
            (error, result, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                return res.status(202).send({});
            }
        )
    });
});

router.patch('/sacar', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            `UPDATE conta SET saldo = saldo - ` + req.body.valor + ` WHERE idConta = ?;`,
            [req.body.idConta],
            (error, result, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Saque realizado com sucesso!',
                    deposito:{
                        valor: req.body.valor,
                        request: {
                            tipo: 'GET',
                            descricao: 'Exibir todas as transações dessa conta',
                            url: 'http://localhost:3000/transacao/consultarTransacao/' + req.body.idConta
                        }
                    }
                }
                return res.status(202).send({response});
            }
        );
        conn.query(
            'INSERT INTO transacao (idConta, descricao, valor, dataTransacao) VALUES (?,?,?,?)',
            [req.body.idConta, req.body.descricao, req.body.valor, req.body.dataTransacao],
            (error, result, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                return res.status(202).send({});
            }
        )
    });
});


module.exports = router;