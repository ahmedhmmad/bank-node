const db = require('../utils/db');
const { getUserByusername } = require('../controllers/authController');

describe('getUserByusername', () => {

    it('should return 401 if username is not found', async () => {
        // Mock the database execute function
        db.execute = jest.fn().mockResolvedValueOnce([[]]);

        await expect(getUserByusername('testuser')).rejects.toEqual(401);
    });

    it('should return the user when it exists in the database', async () => {
        // Mock the database execute function
        db.execute = jest.fn().mockResolvedValueOnce([
            [
                {
                    id: 1,
                    username: 'testuser',
                    role: 'customer'
                }
            ]
        ]);

        const user = await getUserByusername('testuser');
        expect(user).toEqual({
            userId: 1,
            username: 'testuser',
            role: 'customer'
        });
    });

});
