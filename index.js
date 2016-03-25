
//require modules
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//custom modules
var db = require('./config/db');
var user = require('./controllers/user');

//enables packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//routes
app.use(express.static('public'));
app.set('view engine', 'ejs');

//to set index
//ap.get('/', filename)

app.get('/users', user.list); //list page

app.get('/user/new', user.form); //new action
app.post('/users', user.create); //new action

//testing position of show here:
app.get('/users/:id', user.show); //show user

//what was happened thurs let's you update and stuff?
app.post('/users/edit/:id', user.update);
app.get('/users/edit/:id', user.edit);//edit action
// app.get('/users/:id', user.show); //show user

//app.post('/users/edit/:id', user.update); //update user
//app.get('/users/edit/:id', user.edit); //edit current user - post?

app.get('/users/delete/:id', user.remove); //delete action


db.connect('mongodb://localhost:27017/test', function(err) {
    console.log("MongoDB connected...");
    app.listen(8080, function() {
        console.log("Express started...");
    });
});
