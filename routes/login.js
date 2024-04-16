const express=require('express');
const db = require('../utils/db');
const bcrypt = require('bcrypt');
const { rejects } = require('assert');


const router = express.Router();


router.post('/',async(req,res)=>{
    console.log('Connecting....')
    
    const { username, password } = req.body;
    console.log(req.body);

    try{
        const connection= await db.getConnection();
        const user= await getUserByusername(connection,username);
        connection.release();
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({
                message:"Invalid Username or Password"
            });
        } else {
            const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({ accessToken });
        }
    }
    catch (error)
    {
        res.status(501).json({
            message:error

        })
    }

})


const getUserByusername = async (connection, username) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE username=?', [username], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result[0]);
            }
        });
    });
}


module.exports=router