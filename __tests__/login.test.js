const { login } = require('../controllers/authController');
const db = require('../utils/db');

jest.mock('../utils/db'); // Mocking the db module

describe('login function', () => {
    it('should authenticate user and return access token', async () => {
        const req = { body: { username: 'testUser', password: 'validPassword' } };
        const res = { 
            status: jest.fn().mockReturnThis(), 
            json: jest.fn() 
        };

        // Mock db
        db.execute.mockResolvedValueOnce([[{ username: 'testUser', password: 'hashedPassword' }]]);

        await login(req, res);

        // check
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ accessToken: expect.any(String) }));
    });
});
