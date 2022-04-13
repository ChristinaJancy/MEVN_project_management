//import dependencies and set up express
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//load configuration from .env file and set up port
require('dotenv-flow').config();

//import routes and validation
const usersRoute = require("./routes/users");
const rolesRoute = require("./routes/roles");
const projectsRoute = require("./routes/projects");
const tasksRoute = require("./routes/tasks");
const projectTagsRoute = require("./routes/projectTags");
const column = require("./routes/columns");
const columnRoute = column.router;
const projectTemplatesRoute = require("./routes/projectTemplates");


// middleware defitions 

// Handle CORS errors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE"); //allowed methods
  res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//parse request of content type JSO
app.use(express.json());

//connect to the MongoDB using Mongoose ODM 
mongoose.connect(
  process.env.DBHOST, { useUnifiedTopology: true, useNewUrlParser: true
  }
  ).catch(error => console.log("Error connecting to MongoDB: " + error));

mongoose.connection.once('open', () => console.log('Connected succesfully to MongoDB'));

//routes definition 
// authentication routes to secure the API endpoints 
app.use("/api/users", usersRoute);
app.use("/api/roles", rolesRoute); 
app.use("/api/projects", projectsRoute); 
app.use("/api/tasks", tasksRoute);
app.use("/api/project-tags", projectTagsRoute); 
app.use("/api/columns", columnRoute);
app.use("/api/project-templates", projectTemplatesRoute); 


//start up server 
const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log("Server is running on port:  " + PORT);
});

module.exports = app;