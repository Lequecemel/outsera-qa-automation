const { test, expect } = require('@playwright/test');

const baseURL = process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com';
const bookingPayload = () => ({
  firstname: 'QA', lastname: 'Automation', totalprice: 150, depositpaid: true,
  bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' }, additionalneeds: 'Breakfast'
});

async function createToken(request) {
  const response = await request.post(`${baseURL}/auth`, {
    data: { username: 'admin', password: 'password123' },
    headers: { 'Content-Type': 'application/json' }
  });
  expect(response.ok(), 'Authentication endpoint should return success').toBeTruthy();
  const body = await response.json();
  expect(body.token).toBeTruthy();
  return body.token;
}

test.describe('Restful Booker API - booking lifecycle', () => {
  test('GET: list booking IDs and validate status, content type, and body', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    if (body.length) expect(body[0]).toHaveProperty('bookingid');
  });

  test('POST: create booking and validate returned fields', async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, { data: bookingPayload() });
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    expect(body.booking).toMatchObject({ firstname: 'QA', lastname: 'Automation', totalprice: 150, depositpaid: true });
  });

  test('PUT: update a created booking using a valid token', async ({ request }) => {
    const createResponse = await request.post(`${baseURL}/booking`, { data: bookingPayload() });
    expect(createResponse.status()).toBe(200);
    const bookingId = (await createResponse.json()).bookingid;
    const token = await createToken(request);
    const updated = { ...bookingPayload(), firstname: 'UpdatedQA', totalprice: 250 };
    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      data: updated,
      headers: { Cookie: `token=${token}` }
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({ firstname: 'UpdatedQA', totalprice: 250 });
    // Cleanup so the shared demo API is not left with unnecessary records.
    await request.delete(`${baseURL}/booking/${bookingId}`, { headers: { Cookie: `token=${token}` } });
  });

  test('DELETE: delete a created booking with valid authentication', async ({ request }) => {
    const createResponse = await request.post(`${baseURL}/booking`, { data: bookingPayload() });
    expect(createResponse.status()).toBe(200);
    const bookingId = (await createResponse.json()).bookingid;
    const token = await createToken(request);
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, { headers: { Cookie: `token=${token}` } });
    expect([200, 201]).toContain(response.status());
    const check = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(check.status()).toBe(404);
  });

  test('Negative: GET a non-existent booking should return not found', async ({ request }) => {
    const response = await request.get(`${baseURL}/booking/99999999`);
    expect(response.status()).toBe(404);
  });

  test('Negative: create booking with missing required data should be rejected or not create a valid booking', async ({ request }) => {
    const response = await request.post(`${baseURL}/booking`, { data: { firstname: 'OnlyFirstName' } });
    expect([400, 500]).toContain(response.status());
  });

  test('Negative: update without authentication should be rejected', async ({ request }) => {
    const createResponse = await request.post(`${baseURL}/booking`, { data: bookingPayload() });
    expect(createResponse.status()).toBe(200);
    const bookingId = (await createResponse.json()).bookingid;
    const response = await request.put(`${baseURL}/booking/${bookingId}`, { data: bookingPayload() });
    expect([401, 403]).toContain(response.status());
  });
});
