const app = require('../src/app');
const request = require('supertest');
const truncate = require('../src/truncate');

const conta = {
    "idConta": 1,
    "nome": "Heliton",
    "cpf": "12345678910"
}

 describe('Operações de constas', () => {
    afterAll(async () => {
        await truncate();
      });

    it('deve retornar status 201 quando criar uma conta', async () => {
        const response = await request(app)
            .post('/conta/criarConta')
            .send(conta)
        expect(response.status).toBe(201);
    });

    it('deve retornar status 200 quando consultar contas', async () => {
        const response = await request(app)
            .get('/conta/consultarContas')
        expect(response.status).toBe(200);
    });

    it('deve retornar status 200 quando consultar uma conta', async () => {
        const response = await request(app)
            .get('/conta/consultarConta/1')
        expect(response.status).toBe(200);
    });

    it('deve retornar status 202 quando alterar dados de uma conta', async () => {
        const response = await request(app)
            .patch('/conta/alterarDados')
            .send(conta)
        expect(response.status).toBe(202);
    });

    it('deve retornar status 202 quando consultar uma conta', async () => {
        const response = await request(app)
            .patch('/conta/bloquearConta')
            .send(conta)
        expect(response.status).toBe(202);
    });

    it('deve retornar status 202 quando consultar uma conta', async () => {
        const response = await request(app)
            .patch('/conta/desbloquearConta')
            .send(conta)
        expect(response.status).toBe(202);
    });

    it('deve retornar status 202 quando deletar uma conta', async () => {
        const response = await request(app)
            .delete('/conta/excluirConta')
            .send(conta)
        expect(response.status).toBe(202);
    });
}); 