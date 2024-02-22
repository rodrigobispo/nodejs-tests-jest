import { describe } from "@jest/globals";
import supertest from "supertest";
import app from "../../app";

let servidor;
beforeEach(() => {
  const porta = 3000;
  servidor = app.listen(porta);
});

afterEach(() => {
  servidor.close();
});

describe('Testando a rota de login (POST)', () => {
  it('O login deve possuir um e-mail e senha para se autenticar;', async () => {
    const loginMock = {
      email: 'rodrigo@teste.com',
    };

    await supertest(servidor)
      .post('/login')
      .send(loginMock)
      .expect(500)
      .expect('"A senha de usuário é obrigatória!"');
  });

  it('O login deve validar se o usuário está cadastrado;', async () => {
    const loginMock = {
      email: 'rodrigo@teste.com',
      senha: 'senha123',
    };

    await supertest(servidor)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginMock)
      .expect(500)
      .expect('"Usuário não cadastrado."');
  });

  // it('O login deve validar email e senha incorreto', async () => {
  //   const loginMock = {
  //     email: 'raphael@teste.com.br',
  //     senha: '12345',
  //   };
  //   await supertest(app)
  //     .post('/login')
  //     .set('Accept', 'application/json')
  //     .send(loginMock)
  //     .expect(500)
  //     .expect('"Usuário ou senha inválida."');
  // });

  // it('O login deve validar se está sendo retornado um accessToken', async () => {
  //   const loginMock = {
  //     email: 'raphael@teste.com.br',
  //     senha: '123456',
  //   };
  //   const resposta = await supertest(app)
  //     .post('/login')
  //     .set('Accept', 'application/json')
  //     .send(loginMock)
  //     .expect(201);
  //   expect(resposta.body.message).toBe('Usuário conectado');
  //   expect(resposta.body).toHaveProperty('accessToken');
  // });
});
