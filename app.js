const express= require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport-jwt');
const mongoose = require('mongoose');
const config = require('./config/database');

//Conect to Database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected',()=>{
    console.log('connected to database '+ config.database);
});
//On error
mongoose.connection.on('error',(err)=>{
    console.log('Database error: '+ err);
})

const app = express();


const users = require('./routes/users');




// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

//Set static folder

app.use(express.static(path.join(__dirname,'public')))

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

// Index Route
app.get('/', (req, res)=>{
    res.send('Invalid endpoint s')
});

// Start server
app.listen(port, ()=>{
    console.log('Server started on port: '+ port)
});