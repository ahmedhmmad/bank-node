const getConnection = jest.fn().mockResolvedValue({
    query: jest.fn(),
    release: jest.fn(),
  });
  
  module.exports = { getConnection };