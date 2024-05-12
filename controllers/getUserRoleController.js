const jwt = require('jsonwebtoken');
const db = require('../utils/db');

// Define the controller function
const getUserRoleController = async (req, res) => {
  try {
    // Extract the access token from the authorization header
    const token = req.headers.authorization.split(' ')[1]; 
    // Verify the access token
    const decodedToken = jwt.verify(token, 'your_secret_value_here');
    // Extract the username from the token payload
    const username = decodedToken.username;

    // Fetch the user's role from the database
    const user = await getUserByUsername(username);
    if (user) {
      res.json({ role: user.role });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// fetch user by username
const getUserByUsername = async (username) => {
  try {
    const [rows, fields] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
      return rows[0]; 
    } else {
      return null; // User not found
    }
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw error;
  }
};


module.exports = getUserRoleController;
