/*
    File: conta.js
    Author: Heliton Lima
    Date: 18/07
    Description: Rota conta
*/

const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/consultarContas', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM conta',
            (error, resultado, field) => {
                if(error) { return res.status(500).send({ error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    });
});

router.post('/criarConta', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'INSERT INTO conta (nome, cpf, saldo, flagAtivo, dataCriacao) VALUES (?, ?, ?, ?, ?)',
            [req.body.nome, req.body.cpf, req.body.saldo, req.body.flagAtivo, req.body.dataCriacao],
            (error, resultado, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(201).send({
                    mensagem: 'Conta criada com sucesso!',   
                    idConta: resultado.insertId
                })
            }
        )
    })
});

router.get('/consultarConta:idConta', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM conta WHERE idConta = ?',
            [req.params.idConta],
            (error, resultado, field) => {
                if(error) { return res.status(500).send({ error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    });
});

router.patch('/alterarDados', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'UPDATE conta SET nome = ?, cpf = ? WHERE idConta = ?',
            [req.body.nome, req.body.cpf, req.body.idConta],
            (error, resultado, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    mensagem: 'Nome e CPF alterados com sucesso!'
                });
            }
        );
    });
});

router.patch('/bloquearConta', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'UPDATE conta SET flagAtivo = 0 WHERE idConta = ?',
            [req.body.idConta],
            (error, resultado, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    mensagem: 'Conta Bloqueada com sucesso!'
                });
            }
        );
    });
});

router.delete('/excluirConta', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'DELETE FROM conta WHERE idConta = ?',
            [req.body.idConta],
            (error, resultado, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}

                res.status(202).send({
                    mensagem: 'Sua conta foi excluída com sucesso!'
                });
            }
        );
    });
})

module.exports = router;