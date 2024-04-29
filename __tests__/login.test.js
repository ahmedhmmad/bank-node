// login.test.js
const { login, register } = require('../controllers/authController');

describe('login function', () => {
  it('should authenticate user and return access token', async () => {
    const req = { body: { username: 'testuser5', password: 'testpassword' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ accessToken: expect.any(String) }));
  });

});

// describe('register function', () => {
//   it('should register a new user', async () => {
//     const req = { body: { username: 'newuser', password: 'newpassword', role: 'admin' } };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await register(req, res);

//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'User registered successfully' }));
//   });

//   // Add more test cases for error scenarios (missing authorization header, invalid token, database error, etc.)
// });
