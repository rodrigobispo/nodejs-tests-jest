import { describe } from "@jest/globals";
import db from "../../db/dbconfig";

describe('Teste de configuração do database.', () => {
  it('Teste de conexão com o banco de dados', async () => {
    const autorMock = {
      nome: 'Rodrigo',
      nacionalidade: 'Brasileiro',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const autorSalvo = await db('autores').insert(autorMock)
      .then((retorno) => db('autores').where('id', retorno[0]))
      .then((autorConsultado) => autorConsultado[0]);

    expect(autorMock.nome).toBe(autorSalvo.nome);

    await db('autores').where({ id: autorSalvo.id }).del();
  });
});
