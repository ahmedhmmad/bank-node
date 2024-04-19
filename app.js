const express = require('express');
const loginRouter=require('./routes/login');
const registerRouter=require('./routes/register');
const depositeRouter=require('./routes/deposit');
const withdrawalRouter=require('./routes/withdrawal');
const transferRouter=require('./routes/transfer');
const { register } = require('module');


const app = express();
const port=process.env.port || 3000;


app.use(express.json());

app.use('/api/v1/login',loginRouter);
app.use('/api/v1/register',registerRouter);
app.use('/api/v1/deposite',depositeRouter);
app.use('/api/v1/withdrawal',withdrawalRouter);
app.use('/api/v1/transfer',transferRouter);


// Start the server
// const PORT = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
