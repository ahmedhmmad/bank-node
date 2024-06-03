const { login} = require('../controllers/authController'); 
const {getUserByusername}=require('../controllers/authController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { get } = require('../app');

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

    it ('should return 200 and token if login success', async ()=>
    {
        const user={username: 'ahmed',password: '1234'};
        getUserByusername.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);
        const accessToken = 'fake-jwt-token';
        jwt.sign.mockReturnValue(accessToken);
        await login(req,res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ accessToken, redirect: '/dashboard/admin', userId: user.userId });


    })

    
});
