const { login} = require('../controllers/authController'); 
const {getUserByusername}=require('../controllers/authController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

jest.mock('../utils/db');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../controllers/authController', () => ({
    ...jest.requireActual('../controllers/authController'), 
    getUserByusername: jest.fn(),
}));

describe('login', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {
                username: 'testuser',
                password: 'testpassword',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if user is not found', async () => {
        getUserByusername.mockResolvedValue(null);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Username or Password' });
    });

    
});
