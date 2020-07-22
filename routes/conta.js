/*
    File: conta.js
    Author: Heliton Lima
    Date: 18/07
    Description: Rota conta
*/

const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
now = new Date;

router.get('/consultarContas', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM vwConta',
            (error, result, fields) => {
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    quantidade: result.length,
                    contas: result.map(conta => {
                        return {
                            idConta: conta.idConta,
                            nome: conta.nome,
                            request: {
                                tipo: 'GET',
                                descricao: 'Exibir todos detalhes dessa conta',
                                url: 'http://localhost:3000/conta/consultarConta/' + conta.idConta
                            }
                        }
                    })
                }
                return res.status(200).send({response})
            }
        );
    });
});

router.post('/criarConta', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        console.log(req.body);
        conn.query(
            'INSERT INTO conta (nome, cpf, saldo, flagAtivo, dataCriacao) VALUES (?, ?, 0, 1, CURDATE())',
            [req.body.nome, req.body.cpf],
            (error, result, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Conta criada com sucesso!',
                    contaCriada: {
                        idConta: result.idConta,
                        nome: req.body.nome,
                        cpf: req.body.cpf,
                        saldo: 0,
                        flagAtivo: 1,
                        dataCriacao: now.getDate()+'/'+now.getMonth()+'/'+now.getFullYear(),
                        request: {
                            tipo: 'GET',
                            descricao: 'Exibir todas contas criadas',
                            url: 'http://localhost:3000/conta/consultarContas'
                        }
                    }
                }
                return res.status(201).send({response});
            }
        );
    });
});

router.get('/consultarConta/:idConta', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'SELECT * FROM vwConta WHERE idConta = ?;',
            [req.params.idConta],
            (error, result, fields) => {
                if(error) { return res.status(500).send({ error: error})}
                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Esta conta não existe'
                    })
                }
                const response = {
                    conta: {
                        idConta: result[0].idConta,
                        nome: result[0].nome,
                        cpf: result[0].cpf,
                        saldo: result[0].saldo,
                        flagAtivo: result[0].flagAtivo,
                        dataCriacao:result[0].dataCriacao,
                        request: {
                            tipo: 'GET',
                            descricao: 'Exibir todas contas criadas',
                            url: 'http://localhost:3000/conta/consultarContas'
                        }
                    }
                }
                return res.status(200).send({response})
            }
        );
    });
});

router.patch('/alterarDados', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'UPDATE conta SET nome = ?, cpf = ? WHERE idConta = ?',
            [req.body.nome, req.body.cpf, req.body.idConta],
            (error, result, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Nome e CPF alterados com sucesso!',
                    dadosAlterados:{
                        nome: req.body.nome,
                        cpf: req.body.cpf,
                        request: {
                            tipo: 'GET',
                            descricao: 'Exibir todos detalhes dessa conta',
                            url: 'http://localhost:3000/conta/consultarConta/' + req.body.idConta
                        }
                    }
                }
                res.status(202).send({response});
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
            (error, result, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Conta bloqueada com sucesso!',
                    request: {
                        tipo: 'GET',
                        descricao: 'Exibir todos detalhes dessa conta',
                        url: 'http://localhost:3000/conta/consultarConta/' + req.body.idConta
                    }
                }
                res.status(202).send({response});
            }
        );
    });
});

router.patch('/desbloquearConta', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error})}
        conn.query(
            'UPDATE conta SET flagAtivo = 1 WHERE idConta = ?',
            [req.body.idConta],
            (error, result, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Conta desbloqueada com sucesso!',
                    request: {
                        tipo: 'GET',
                        descricao: 'Exibir todos detalhes dessa conta',
                        url: 'http://localhost:3000/conta/consultarConta/' + req.body.idConta
                    }
                }
                res.status(202).send({response});
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
            (error, result, fields) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error})}
                const response = {
                    mensagem: 'Conta excluída com sucesso!',
                    request: {
                        tipo: 'GET',
                        descricao: 'Exibir todas contas criadas',
                        url: 'http://localhost:3000/conta/consultarContas'
                    }
                }
                res.status(202).send({response});
            }
        );
    });
})

module.exports = router;