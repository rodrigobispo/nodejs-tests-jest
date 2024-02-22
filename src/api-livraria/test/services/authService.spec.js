import bcryptjs from 'bcryptjs';
import Usuario from '../../models/usuario';
import AuthService from '../../services/authService';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  it('Deve possuir um nome, email e senha para o usuário', async () => {
    const usuarioMock = {
      nome: 'Fulano',
      email: 'fulano@teste.com.br',
    };

    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

    await expect(usuarioSalvo).rejects.toThrowError('A senha de usuário é obrigatória!');
  });

  it('Deve criptografar a senha do usuário quando for salvo no banco de dados', async () => {
    const data = {
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: 'senha123',
    };

    const usuarioCadastrado = await authService.cadastrarUsuario(data);
    const senhaIguais = await bcryptjs.compare('senha123', usuarioCadastrado.content.senha);

    expect(senhaIguais).toStrictEqual(true);

    await Usuario.excluir(usuarioCadastrado.content.id);
  });

  it('Não deve ser cadastrado um usuário com e-mail duplicado', async () => {
    const usuarioMock = {
      nome: 'Mauro',
      email: 'teste@gmail.com',
      senha: '123456',
    };

    const usuarioCadastrado = await authService.cadastrarUsuario(usuarioMock);
    const outraInsercaoDeUsuario = authService.cadastrarUsuario(usuarioMock);

    await expect(outraInsercaoDeUsuario).rejects.toThrowError('O email já esta cadastrado!');

    await Usuario.excluir(usuarioCadastrado.content.id);
  });

  it('Deve retornar mensagem que o usuário foi criado ao cadastrar um usuário', async () => {
    const data = {
      nome: 'Ciclano',
      email: 'ciclano@teste.com.br',
      senha: 'password123',
    };
    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.message).toEqual('usuário criado');

    await Usuario.excluir(resultado.content.id);
  });

  it('Deve validar o retorno das informações do usuário ao ser cadastrado', async () => {
    const data = {
      nome: 'Mario',
      email: 'mario@example.com',
      senha: 'senha123',
    };

    const resultado = await authService.cadastrarUsuario(data);

    expect(resultado.content).toMatchObject(data);

    await Usuario.excluir(resultado.content.id);
  });
});
