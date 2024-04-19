//models/User.js

const db= require('../utils/db');


class User{
    constructor(id,username,password,role)
    {
        this.id=id;
        this.username=username;
        this.password=password;
        this.role=role;
    }


async getById (id)
{
    const connection=await db.getConnection();
    const [row]=connection.query('SELECT * FROM users WHERE id=?',[id]);
    connection.release();
    if(row.length === 0) return null;
    

}


}