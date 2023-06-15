import { calculaDescontos, somaHorasExtras } from "../calculosFolhaDePagamento";

test('deve retornar a soma das horas extras', () => {
  const esperado = 2500;
  const retornado = somaHorasExtras(2000, 500);

  expect(retornado).toBe(esperado);
});

test('deve descontar valor no salario', () => {
  const esperado = 2300;
  const retornado = calculaDescontos(2500, 200);

  expect(retornado).toBe(esperado);
});
