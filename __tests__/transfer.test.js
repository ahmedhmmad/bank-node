const db = require('../utils/db');
const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { transferMoney } = require('../controllers/customerController');

jest.mock('jsonwebtoken');
jest.mock('../utils/db');
jest.mock('../models/Customer', () => ({
    getCustomerAccountById: jest.fn(),
}));
jest.mock('../controllers/customerController', () => ({
    ...jest.requireActual('../controllers/customerController'),
    updateAccountBalance: jest.fn(),
    registerTransaction: jest.fn(),
}));

describe('transferMoney', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                receiverId: 2,
                amount: 100,
            },
            headers: {
                authorization: 'Bearer validToken',
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jwt.verify.mockReturnValue({ userId: 1 });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if authorization header is missing', async () => {
        req.headers.authorization = undefined;

        await transferMoney(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Autherization header is missing' });
    });

    it('should return 500 if sender account is not found', async () => {
        Customer.getCustomerAccountById.mockResolvedValueOnce(null);

        await transferMoney(req, res);

        expect(Customer.getCustomerAccountById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });

    it('should return 500 if receiver account is not found', async () => {
        const senderAccount = { userId: 1, balance: 1000 };
        Customer.getCustomerAccountById.mockResolvedValueOnce(senderAccount).mockResolvedValueOnce(null);

        await transferMoney(req, res);

        expect(Customer.getCustomerAccountById).toHaveBeenCalledWith(1);
        expect(Customer.getCustomerAccountById).toHaveBeenCalledWith(2);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });

    it('should return 500 if insufficient balance for transfer', async () => {
        const senderAccount = { userId: 1, balance: 100 };
        const receiverAccount = { userId: 2, balance: 500 };

        Customer.getCustomerAccountById
            .mockResolvedValueOnce(senderAccount)
            .mockResolvedValueOnce(receiverAccount);

        await transferMoney(req, res);

        expect(Customer.getCustomerAccountById).toHaveBeenCalledWith(1);
        expect(Customer.getCustomerAccountById).toHaveBeenCalledWith(2);

    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });

    it('should transfer money successfully', async () => {
        const senderAccount = { userId: 1, balance: 1000 };
        const receiverAccount = { userId: 2, balance: 500 };

        Customer.getCustomerAccountById
            .mockResolvedValueOnce(senderAccount)
            .mockResolvedValueOnce(receiverAccount);

        await transferMoney(req, res);

        expect(Customer.getCustomerAccountById).toHaveBeenCalledWith(1);
        expect(Customer.getCustomerAccountById).toHaveBeenCalledWith(2);

        expect(Customer.updateAccountBalance).toHaveBeenCalledWith(1, 900);
        expect(Customer.updateAccountBalance).toHaveBeenCalledWith(2, 600);

        expect(Customer.registerTransaction).toHaveBeenCalledWith(1, 2, 100, 'transfer');

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Transfer successful', newBalance: 900 });
    });
});
