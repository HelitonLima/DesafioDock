const app = require('../src/app');
const request = require('supertest');

const transacao = {
    "idConta": 1,
    "descricao": "transacao no valor de  R$: 1.500,00",
    "valor": 1500,
    "dataInicio": "20/07/2020",
    "dataFim": "23/07/2020"
}

const transacaoTest = {
    "idConta": 9999
}

 describe('criação de Operações de transferencias', () => {

    it('deve retornar status 201 quando criar uma conta para teste de transacao', async () => {
        const response = await request(app)
            .post('/conta/criarConta')
            .send({
                "nome": "Heliton",
                "cpf": "12345678910"
            })
        expect(response.status).toBe(201);
    });

    it('deve retornar status 200 quando consultar todas transações', async () => {
        const response = await request(app)
            .get('/transacao/consultarTransacoes')
        expect(response.status).toBe(200);
    });

     it('deve retornar status 200 quando consultar todas transações de uma conta', async () => {
        const response = await request(app)
            .get('/transacao/consultarTransacao/1')
        expect(response.status).toBe(200);
    }); 

    it('deve retornar status 404 quando consultar todas transações de uma conta não existente', async () => {
        const response = await request(app)
            .get('/transacao/consultarTransacao/9999')
        expect(response.status).toBe(404);
    });

     it('deve retornar status 201 quando realizar um depósito', async () => {
        const response = await request(app)
            .patch('/transacao/depositar')
            .send(transacao)
        expect(response.status).toBe(202);
    }); 
    
    it('deve retornar status 404 quando realizar um depósito em uma conta não existente', async () => {
        const response = await request(app)
            .patch('/transacao/depositar')
            .send(transacaoTest)
        expect(response.status).toBe(404);
    }); 

     it('deve retornar status 201 quando realizar um saque', async () => {
        const response = await request(app)
            .patch('/transacao/sacar')
            .send(transacao)
        expect(response.status).toBe(202);
    }); 

    it('deve retornar status 404 quando realizar um saque em uma conta não existente', async () => {
        const response = await request(app)
            .patch('/transacao/sacar')
            .send(transacaoTest)
        expect(response.status).toBe(404);
    });

    it('deve retornar status 200 quando consultar transações por um determinado período', async () => {
        const response = await request(app)
            .get('/transacao/extratoPeriodo')
        expect(response.status).toBe(200);
    });
}); 