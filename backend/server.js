//import dependencies and set up express
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//load configuration from .env file and set up port
require('dotenv-flow').config();

//import routes and validation
const authRoutes = require("./routes/auth");

// middleware defitions 
// parse requests of content-type - application/json 
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Handle CORS errors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//connect to the MongoDB using Mongoose ODM 
mongoose.connect (
  process.env.DBHOST,  { useUnifiedTopology: true, useNewUrlParser: true } 
).catch(error => console.log("Error connecting to MongoDB: " + error));

mongoose.connection.once('open', () => console.log('Connected succesfully to MongoDB'));

//routes definition 
//Welcome route 
app.get("/api/welcome", (req,res) => { 
  res.status(200).send({message: "Welcome to the MEN-REST-API"});
}); 

// authentication routes to secure the API endpoints 
app.use("/api/user", authRoutes); //authentication routes (register, login)

//start up server 
const PORT = process.env.PORT || 4000; 
app.listen(PORT, function () { 
  console.log("Server is running on port:  " + PORT); 
});

module.exports = app; //export app for testing