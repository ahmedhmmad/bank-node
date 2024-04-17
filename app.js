const express = require('express');
const loginRouter=require('./routes/login');
const registerRouter=require('./routes/register');
const depositeRouter=require('./routes/deposit');
const withdrawalRouter=require('./routes/withdrawal');
const { register } = require('module');


const app = express();


app.use(express.json());

app.use('/api/v1/login',loginRouter);
app.use('/api/v1/register',registerRouter);
app.use('/api/v1/deposite',depositeRouter);
app.use('/api/v1/withdrawal',withdrawalRouter);


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
