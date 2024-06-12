const db = require("../utils/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { register, saveUser } = require("../controllers/authController");

jest.mock('jsonwebtoken');
jest.mock('bcrypt');
jest.mock('../utils/db');
jest.mock('../controllers/authController', () => ({
    saveUser: jest.fn(),
    register: jest.requireActual('../controllers/authController').register,
}));
describe("Register", () => {
  let req, res;

    beforeEach(() => {
        req = {
            body: {
                username: 'testuser',
                password: 'testpassword',
                role: 'customer'
            },
            headers: {}
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

  it('should register a customer without authorization header', async () => {
            bcrypt.hash.mockResolvedValue('hashedPassword');
            saveUser.mockResolvedValue();


  });
});