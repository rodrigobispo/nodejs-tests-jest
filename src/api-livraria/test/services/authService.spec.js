import AuthService from '../../services/authService';

const authService = new AuthService();

describe('Testando a authService.cadastrarUsuario', () => {
  it('O usuario deve possuir um nome, email e senha', async () => {
    const usuarioMock = {
      nome: 'Fulano',
      email: 'fulano@teste.com.br',
    };

    const usuarioSalvo = authService.cadastrarUsuario(usuarioMock);

    await expect(usuarioSalvo).rejects.toThrowError('A senha de usuário é obrigatória!');
  });
});
