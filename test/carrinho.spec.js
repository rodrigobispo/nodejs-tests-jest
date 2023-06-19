import Carrinho from '../src/carrinho/carrinho';
import Item from '../src/carrinho/item';

describe('Testes do carrinho', () => {
  it('deve inicializar vazio', () => {
    const carrinho = new Carrinho();
    expect(carrinho.subtotal).toBeNull();
  });

  it('deve ter itens', () => {
    const item1 = new Item('Banana', 0.3, 3);
    const item2 = new Item('Maçã', 0.5, 1);

    const carrinho = new Carrinho();
    carrinho.adiciona(item1);
    carrinho.adiciona(item2);

    expect(typeof carrinho).toBe('object');
    expect(carrinho.itens[0]).toBe(item1);
    expect(carrinho.itens[1]).toBe(item2);

    expect(carrinho.itens).toContain(item1);
    expect(carrinho.itens).toContain(item2);
  });

  it('deve ter a propriedade "total" na inicialização', () => {
    const carrinho = new Carrinho();
    expect(carrinho).toHaveProperty('total');
  });

  it('deve lançar erro ao finalizar compra com carrinho vazio', () => {
    const carrinho = new Carrinho();
    expect(() => {
      carrinho.finalizaCompra();
    }).toThrow(Error);
  });

  it('deve adicionar o frete', () => {
    const carrinho = new Carrinho();
    carrinho.adicionaFrete(10);
    expect(carrinho.frete).toBe(10);
  });

  it('deve finalizar a compra com sucesso', () => {
    const item1 = new Item('Banana', 2.00, 5);
    const item2 = new Item('Mel', 4.00, 2);

    const carrinho = new Carrinho();

    carrinho.adiciona(item1);
    carrinho.adiciona(item2);

    carrinho.adicionaFrete(3.00);

    expect(carrinho.finalizaCompra()).toStrictEqual({
      subtotal: 18,
      frete: 3,
      total: 21,
    });
  });
});
