const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js

describe('POST /api/v1/login', () => {
  it('should return a JWT token upon successful login', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
    };

    // Assuming testuser exists in your database with the given password
    const response = await request(app)
      .post('/api/v1/login')
      .send(userData);

    // Expecting a 200 response with an access token
    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });

//   it('should return 401 for invalid credentials', async () => {
//     const invalidUserData = {
//       username: 'invaliduser',
//       password: 'invalidpassword',
//     };

//     const response = await request(app)
//       .post('/api/v1/login')
//       .send(invalidUserData);

//     // Expecting a 401 response for invalid credentials
//     expect(response.status).toBe(401);
//     expect(response.body.message).toBe('Invalid Username or Password');
//   });

  it('should return 500 for server error', async () => {
    // Mocking a server error by sending invalid data
    const invalidData = {
      invalidKey: 'invalidValue',
    };

    const response = await request(app)
      .post('/api/v1/login')
      .send(invalidData);

    // Expecting a 500 response for server error
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Internal Server Error');
  });
});
