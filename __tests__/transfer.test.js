// const request = require('supertest');
// const app = require('../app'); 

// describe('POST /api/v1/transfer', () => {
//   it('should transfer money successfully', async () => {
//     const transferData = {
//       senderId: 123, 
//       receiverId: 456, 
//       amount: 100, 
//     };

//     const response = await request(app)
//       .post('/api/v1/transfer')
//       .send(transferData);

//     // Expecting a 200 response with a success message and transfer fee
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('Transfer successful');
//     expect(response.body.transferFee).toBeDefined();
//   });

//   it('should return 404 if sender or receiver account not found', async () => {
//     const invalidTransferData = {
//       senderId: 9999, // Invalid sender ID
//       receiverId: 8888, // Invalid receiver ID
//       amount: 100,
//     };

//     const response = await request(app)
//       .post('/api/v1/transfer')
//       .send(invalidTransferData);

//     // Expecting a 404 response for sender or receiver account not found
//     expect(response.status).toBe(404);
//     expect(response.body.message).toBe('Sender or receiver account not found');
//   });

//   it('should return 400 if sender has insufficient balance', async () => {
//     // Set up sender with insufficient balance
//     // Replace senderId with a valid sender ID and balance less than transfer amount
//     const senderId = 123;
//     const senderAccount = await getAccountById(senderId);
//     const transferData = {
//       senderId,
//       receiverId: 456,
//       amount: senderAccount.balance + 1, // Amount greater than sender's balance
//     };

//     const response = await request(app)
//       .post('/api/v1/transfer')
//       .send(transferData);

//     // Expecting a 400 response for insufficient balance
//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe('Insufficient balance for transfer👌');
//   });

//   it('should return 500 for server error', async () => {
//     // Mocking a server error by sending invalid data
//     const invalidData = {
//       invalidKey: 'invalidValue',
//     };

//     const response = await request(app)
//       .post('/api/v1/transfer')
//       .send(invalidData);

//     // Expecting a 500 response for server error
//     expect(response.status).toBe(500);
//     expect(response.body.message).toBe('Internal Server Error');
//   });
// });
