import request from 'supertest';
import app from "../../app.js";

let server;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('deve retornar uma lista de editoras', async () => {
    const resposta = await request(app).get('/editoras').expect(200);

    const tamanhoLista = resposta.body.length;
    const primeiraEditora = resposta.body[0];

    expect(primeiraEditora).toStrictEqual(expect.objectContaining({
      id: expect.any(Number),
      ...primeiraEditora,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));
    expect(tamanhoLista).toBeGreaterThan(0);
  });
});

let idEditoraGravada;
describe('POST em /editoras', () => {
  it('deve adicionar uma nova editora', async () => {
    const resposta = await request(app).post('/editoras').send({
      nome: 'TESTE',
      cidade: 'Brasília',
      email: 'teste@com',
    }).expect(201);

    idEditoraGravada = resposta.body.content.id;
  });
});

describe('DELETE em /editoras/id', () => {
  it('deve deletar a editora gravada', async () => {
    await request(app)
      .delete(`/editoras/${idEditoraGravada}`)
      .expect(200);
  });
});
