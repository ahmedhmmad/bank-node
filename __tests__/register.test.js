const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');

jest.mock('bcrypt');

describe('POST /api/v1/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user successfully', async () => {
    // Mocking bcrypt.hash to return a hashed password
    bcrypt.hash.mockResolvedValue('hashedPassword');

    const userData = {
      username: 'testuser',
      password: 'testpassword',
      role: 'customer',
    };

    // Sending a POST request to the register endpoint
    const response = await request(app)
      .post('/api/v1/register')
      .send(userData);

    // Expect 201, and success message
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'User registered successfully' });

 
  });

  it('should return 500 on server error', async () => {
    // Mocking bcrypt.hash to throw an error
    bcrypt.hash.mockRejectedValue(new Error('bcrypt hashing error'));

    const userData = {
      username: 'testuser',
      password: 'testpassword',
      role: 'customer',
    };

    // Sending a POST request to the register endpoint
    const response = await request(app)
      .post('/api/v1/register')
      .send(userData);

    // Expecting a 500 response with an error message
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal Server Error' });
});


});
