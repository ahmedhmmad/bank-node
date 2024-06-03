const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const login = async (req, res) => {
    console.log('Connecting....');
    
    const { username, password } = req.body;
    
    try {
        const user = await getUserByusername(username);
        if (!user) {
            return res.status(401).json({ message: "Invalid Username or Password" });
        }
        
        const MatchedPassword = await bcrypt.compare(password, user.password);
        if (!MatchedPassword) {
            return res.status(401).json({ message: "Invalid Username or Password" });
        }
        
        const accessToken = jwt.sign({ 
            userId: user.userId, // Include userId
            username: user.username, 
            role: user.role //include role
        }, jwtSecret);
        
        res.status(200).json({ accessToken, redirect: '/dashboard', userId: user.userId }); 
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]; 
            try {
                const decodedToken = jwt.verify(token, jwtSecret);
                const userRole = decodedToken.role;

                if (userRole !== 'admin') {
                    return res.status(403).json({ message: "Only admins can register" });
                }
                
                const hashedPassword = await bcrypt.hash(password, 10);
                const connection = await db.getConnection();
                await saveUser(username, hashedPassword, role);
                connection.release();

                res.status(201).json({ message: "User registered successfully" });
            } catch (err) {
                return res.status(401).json({ message: "Invalid JWT token" });
            }
        } else {
            if (role !== 'customer') {
                return res.status(403).json({ message: "Only customers can be registered without authorization" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const connection = await db.getConnection();
        await saveUser(username, hashedPassword, role);
        connection.release();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Function to save user to the database
const saveUser = async (username, password, role) => {
    try {
        const [insertResult] = await db.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
        
        const insertQuery = getInsertQueryForRole(role);
        if (insertQuery) {
            await db.execute(insertQuery, [insertResult.insertId]);
        }
    } catch (error) {
        console.error('Error saving user:', error);
        throw error; 
    }
};

const getInsertQueryForRole = (role) => {
    switch (role) {
        case 'admin':
            return 'INSERT INTO admins (user_id) VALUES (?)';
        case 'clerk':
            return 'INSERT INTO clerks (user_id) VALUES (?)';
        case 'customer':
            return 'INSERT INTO customers (user_id, balance) VALUES (?, 0.00)';
        default:
            return null;
    }
};

const getUserByusername = async (username) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        
        if (rows.length > 0) {
            return {
                userId: rows[0].id,
                username: rows[0].username,
                password: rows[0].password,
                role: rows[0].role
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
};

module.exports = { login, register, getUserByusername };
