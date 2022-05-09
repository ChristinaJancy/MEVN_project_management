process.env.NODE_ENV = 'test';

//import all mongoose models
const Column = require('../models/columns');
const Task = require('../models/tasks');
const User = require('../models/users');
const Project = require('../models/projects');
const Tag = require('../models/tags');
const ProjectTemplate = require('../models/projectTemplates');
const Role = require('../models/roles');


//clean up the database before and after each test
beforeEach((done) => { 
    Column.deleteMany({}, function(err) {});
    Task.deleteMany({}, function(err) {});
    Project.deleteMany({}, function(err) {});
    Tag.deleteMany({}, function(err) {});
    ProjectTemplate.deleteMany({}, function(err) {});
    Role.deleteMany({}, function(err) {});
    User.deleteMany({}, function(err) {});
    done();
});

afterEach((done) => {
    Column.deleteMany({}, function(err) {});
    Task.deleteMany({}, function(err) {});
    Project.deleteMany({}, function(err) {});
    Tag.deleteMany({}, function(err) {});
    ProjectTemplate.deleteMany({}, function(err) {});
    Role.deleteMany({}, function(err) {});
    User.deleteMany({}, function(err) {});
    done();
});