const express=require('express');
const db = require('../utils/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { rejects } = require('assert');

const router = express.Router();

router.post('/',async(req,res)=>{
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

})


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
        });
    });
    
}


module.exports=router