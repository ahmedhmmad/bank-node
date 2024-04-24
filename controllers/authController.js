const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login=async(req,res)=>{
    console.log('Connecting....')
    
    const { username, password } = req.body;
    //this.password=await bcrypt.hash(password);
    //console.log(req.body);

    try{
        const connection= await db.getConnection();
        const user= await getUserByusername(connection,username);
        connection.release();

        
        const MatchedPassword = await bcrypt.compare(password, user.password);
        
        if (!user || !MatchedPassword) {
            
            console.log(`${password}   ====   ${user.password}`)
            
            return res.status(401).json({ message: "Invalid Username or Password" });
        }
        if(user && MatchedPassword)
        {

        console.log('User logged in:', user.username);
        const accessTokenSecret = 'your_secret_value_here';


        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);
        return res.status(200).json({ accessToken });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}
const register= async (req, res) => {
    const { username, password, role } = req.body;

    try {
        //check autherization header content
        if(!req.headers.authorization)
        {
           return res.status(401).json({message:"Autherization header is missing"});
        }
        //Get the User role from token
        const token = req.headers.authorization.split(' ')[1]; 
        try{
            const decodedToken = jwt.verify(token, 'your_secret_value_here');
            const userRole = decodedToken.role;

            //check if user is Admin
            if(userRole !=='admin')
            {
                return res.status(403).json({message:"Only admins can register"})
            }
            
        }catch(err)
        {
            return res.status(401).json({message:"Invalid JWT token"});
        }
        

       
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        const connection = await db.getConnection();
        await saveUser(connection, username, hashedPassword, role);
        connection.release();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Function to save user to the database
const saveUser = async (connection, username, password, role) => {
    return new Promise((resolve, reject) => {
        // Insert user into the users table
        connection.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], (error, result) => {
            if (error) {
                reject(error);
            } else {
                // Depending on the role, insert additional information into the corresponding table
                const insertQuery = getInsertQueryForRole(role);
                if (insertQuery) {
                    connection.query(insertQuery, [result.insertId], (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    // If role is not recognized, resolve immediately
                    resolve();
                }
            }
        });
    });
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


const getUserByusername = async (connection, username) => {
    
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE username=?', [username], (error, result) => {
            if (error) {
                //console.log(`Error executing query: ${error}`);
                reject(error);
            } else {
                //console.log(`Query result for ${username}:`, result);
                resolve(result[0]);
            }
        })})};


module.exports={login,register}