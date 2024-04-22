const request = require('supertest');
const app = require('../app'); 

describe('POST /api/v1/deposite', () => {
  it('should deposit money successfully', async () => {
    const depositData = {
      customerId: 2, 
      amount: 100, 
    };

    const response = await request(app)
      .post('/api/v1/deposite')
      .send(depositData);

    // Expecting a 200 response with a success message and updated balance
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Deposit successful');
    expect(response.body.newBalance).toBeDefined();
  });

  it('should return 404 for invalid customer ID', async () => {
    const invalidDepositData = {
      customerId: 9999, // Invalid customer ID
      amount: 100,
    };

    const response = await request(app)
      .post('/api/v1/deposite')
      .send(invalidDepositData);

    // Expecting a 404 response for invalid customer ID
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Customer not found');
  });

  it('should return 500 for server error', async () => {
    // Mocking a server error by sending invalid data
    const invalidData = {
      invalidKey: 'invalidValue',
    };

    const response = await request(app)
      .post('/api/v1/deposite')
      .send(invalidData);

    // Expecting a 500 response for server error
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });
});
