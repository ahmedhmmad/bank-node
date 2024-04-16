const express = require('express');
const loginRouter=require('./routes/login');
const registerRouter=require('./routes/register');
const { register } = require('module');


const app = express();


app.use(express.json());

app.use('/api/v1/login',loginRouter);
app.use('/api/v1/register',registerRouter)


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
