const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login=async(req,res)=>{
    console.log('Connecting....')
    
    const { username, password } = req.body;
    //this.password=await bcrypt.hash(password);
    //console.log(req.body);

    try{
       // const connection= await db.getConnection();
        const user= await getUserByusername(username);
        //connection.release();

        
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
        // return res.status(200).json({ accessToken });
        res.status(200).json({ accessToken, redirect: '/dashboard' });
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
        await saveUser(username, hashedPassword, role);
        connection.release();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Function to save user to the database
const saveUser = async (username, password, role) => {
    try {
        // Insert user into the users table
        const [insertResult] = await db.execute('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
        
        // Insert According to user Role
        const insertQuery = getInsertQueryForRole(role);
        if (insertQuery) {
            const [additionalInsertResult] = await db.execute(insertQuery, [insertResult.insertId]);
          
        }

      
        return;
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
        const [rows, fields] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        
        if (rows.length > 0) {
            return rows[0]; // Return the first user found (assuming username is unique)
        } else {
            return null; // User not found
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error; // Propagate the error back to the caller
    }
};

       


module.exports={login,register}