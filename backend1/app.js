const express = require('express')
const cors = require('cors');
const fs = require('fs');
const { db } = require('./db/database');
const {readdirSync} = require('fs');
const { registerUser } = require('./controller/user');
const { errorhandler } = require('./middleware/error');
const userRoute = require('./routes/userrt');
const trackrouter = require('./routes/track');
const app = express()

require('dotenv').config()

const PORT = 3000;

//middlewares
app.use(express.json())
app.use(cors())
//routes
app.use("/api/user" , userRoute);
app.use("/api/track" , trackrouter);
//error
app.use(errorhandler);


const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server();