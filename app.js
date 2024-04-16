const express = require('express');
const loginRouter=require('./routes/login')


const app = express();


app.use(express.json());

app.use('/api/v1/login',loginRouter);


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
