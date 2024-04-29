// const request = require('supertest');
// const app = require('../app');

// describe('POST /api/v1/withdrawal', () => {
//   it('should withdraw money successfully', async () => {
//     const withdrawalData = {
//       customerId: 3, 
//       amount: 50.5,
//     };

//     const response = await request(app)
//       .post('/api/v1/withdrawal')
//       .send(withdrawalData);

//     // Expecting a 200 response with a success message and new balance
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('Withdrawal successful');
//     expect(response.body.newBalance).toBeDefined();
//   });

//   it('should return 400 if withdrawal amount exceeds current balance', async () => {
//     // Set up customer with insufficient balance
//     // Replace customerId with a valid customer ID and balance less than withdrawal amount
//     const customerId = 123;
//     const customerBalance = await getCustomerBalance(customerId);
//     const withdrawalData = {
//       customerId,
//       amount: customerBalance + 1, // Amount greater than customer's balance
//     };

//     const response = await request(app)
//       .post('/api/v1/withdrawal')
//       .send(withdrawalData);

//     // Expecting a 400 response for insufficient funds
//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe('Insufficient funds');
//   });

//   it('should return 500 for server error', async () => {
//     // Mocking a server error by sending invalid data
//     const invalidData = {
//       invalidKey: 'invalidValue',
//     };

//     const response = await request(app)
//       .post('/api/v1/withdrawal')
//       .send(invalidData);

//     // Expecting a 500 response for server error
//     expect(response.status).toBe(500);
//     expect(response.body.message).toBe('Internal Server Error');
//   });
// });
