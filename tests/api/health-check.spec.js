
const { test, expect } = require('@playwright/test');

test('Deve acessar a API com sucesso', async ({ request }) => {
  const response = await request.get(
    'https://restful-booker.herokuapp.com/booking'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(Array.isArray(body)).toBeTruthy();

  console.log('Status recebido:', response.status());
  console.log('Quantidade de reservas:', body.length);
});