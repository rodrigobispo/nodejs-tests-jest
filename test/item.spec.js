import Item from '../src/carrinho/item';

describe('Testes dos itens', () => {
  it('deve ter 3 campos: nome, valor, quantidade', () => {
    const item = new Item('Beterraba', 2.5, 10);

    expect(item.nome).toBe('Beterraba');
    expect(item.valor).toBe(2.5);
    expect(item.quantidade).toBe(10);
  });

  it('deve ter o preço calculado de acordo com a quantidade', () => {
    const item = new Item('Beterraba', 0.3, 3);
    expect(item.pegaValorTotalItem()).toBeCloseTo(0.9);
  });
});
