const app = require('../app');
const request = require('supertest');

const conta = {
    "idConta": 3,
    "nome": "Heliton",
    "cpf": "12345678910"
}

describe('criação de conta', () => {
    it('deve retornar status 201 quando criar uma conta', async () => {
        request(app)
            .post('/conta/criarConta')
            .send(conta)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    })
});

describe('consulta de contas', () => {
    it('deve retornar status 200 quando consultar contas', async () => {
        request(app)
            .get('/conta/consultarContas')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    })
});

describe('consulta de uma conta', () => {
    it('deve retornar status 200 quando consultar uma conta', async () => {
        request(app)
            .get('/conta/consultarConta/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    })
});

describe('alterar dados de uma conta', () => {
    it('deve retornar status 202 quando consultar uma conta', async () => {
        request(app)
            .patch('/conta/alterarDados')
            .send(conta)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(202)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    })
});

describe('bloquear uma conta', () => {
    it('deve retornar status 202 quando consultar uma conta', async () => {
        request(app)
            .patch('/conta/bloquearConta')
            .send(conta)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(202)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    })
});

describe('desbloquear uma conta', () => {
    it('deve retornar status 202 quando consultar uma conta', async () => {
        request(app)
            .patch('/conta/desbloquearConta')
            .send(conta)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(202)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    })
});

describe('deletar uma conta', () => {
    it('deve retornar status 2 quando deletar uma conta', async () => {
        request(app)
            .delete('/conta/excluirConta')
            .send(conta)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(202)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    })
});