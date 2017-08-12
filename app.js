const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


// connect to database
mongoose.connect(config.database);

// successfull connection
mongoose.connection.on('connected',() =>{
    console.log("connected to database "+config.database);
})

// error connection
mongoose.connection.on('error',(err) =>{
    console.log("database error "+err);
})



const app = express();

const users = require('./routes/users');


//CORS middleware
app.use(cors());

//body-parser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);


// set static folder or file
app.use(express.static(path.join(__dirname,'public')));

//below one for local running
//const port= 3000;

// for heroku server below mentioned port-

const port = process.env.PORT || 8080;




// defaul url to hit
app.get("/",(req,res) => {
    res.send("Invalid endpoint");
})


app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});
// start server
app.listen(port,()=>{
    console.log("server started on port " +port);
})

