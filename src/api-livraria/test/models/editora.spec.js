import { jest } from "@jest/globals";
import Editora from "../../models/editora.js";

describe('Testes de modelo, Editora', () => {
  const objetoEditora = {
    nome: "CDC",
    cidade: "São Paulo",
    email: "c@c.com",
  };

  it('deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);
    expect(editora).toEqual(expect.objectContaining(objetoEditora));
  });

  it.skip('deve salvar editora no banco de dados', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar().then((dado) => {
      expect(dado.nome).toBe("CDC");
    });
  });

  it.skip('deve salvar editora no BD usando sintaxe moderna, modo assíncrono', async () => {
    const editora = new Editora(objetoEditora);

    const dados = await editora.salvar();

    const editoraBuscada = await Editora.pegarPeloId(dados.id);

    expect(editoraBuscada).toEqual(expect.objectContaining({
      id: expect.any(Number),
      ...objetoEditora,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    }));
  });

  it('deve fazer uma chamada simulada ao BD', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CDC',
      cidade: 'São Paulo',
      email: 'c@c.com',
      created_at: '2022-10-01',
      updated_at: '2022-10-01',
    });

    const retorno = editora.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
