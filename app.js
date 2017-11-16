let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 3000;
// let user = require('./app/routes/user');
let User = require('./app/models/users');
let Reminder = require('./app/models/reminders');
// let reminder = require('./app/routes/reminder');
let config = require('config'); //we load the db location from the JSON files
//db options
let options = { 
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              }; 

//db connection      
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.get("/", (req, res) => res.json({message: "Welcome to our UserDetails!"}));

app.route("/user")
    .get(function(req,res){
    	let query = User.find({});
    	query.exec((err, users) => {
        if(err){
            res.status(400).send(err);
        } 
        else{
            res.json(users);
        }
    });
    });
app.route("/user")    
    .post(function(req,res){
    	let newUser = new User(req.body);
    	newUser.save((err,users) => {
        if(err) {
            res.status(400).send(err);
        }
        else { 
            res.json({ message: "User successfully added!",users});
        }
    });
    });
app.route("/user/:id")
    .get(function(req,res){
    	User.findById({_id:req.params.id}, (err, user) => {
        if(err){
            res.status(400).send(err);
        } 
        else{
          res.json(user);
        }  
    });
    });
app.route("/user/:id")    
    .delete(function(req,res){
    	User.remove({_id : req.params.id}, (err, result) => {
            if(err){
                res.status(400).send(err);
            }
            else{
                res.json({ message: "User successfully deleted!", result });
            }    
    });
    });

app.route("/reminder")
    .get(function(req,res){
    	let query = Reminder.find({});
    	query.exec((err, reminders) => {
        if(err) {
            res.status(400).send(err);
        }    
        else{
            res.json(reminders);
        }    
    });
});

app.route("/reminder")    
    .post(function(req,res){
    	let newReminder = new Reminder(req.body);
    	newReminder.save((err,reminders) => {
        if(err) {
            res.status(400).send(err);
        }
        else { 
            res.json({message: "Reminder successfully added!", reminders });
        }
    });
});

app.route("/reminder")    
    .delete(function(req,res){
    	Reminder.remove({}, (err, result) => {
            if(err){
                res.status(400).send(err);
            }
            else{
                res.json({ message: "All Reminders successfully deleted!", result });
            }       
    });
});

app.route("/reminder/:id")
    .get(function(req,res){
    	Reminder.findById({_id: req.params.id}, (err, reminders) => {
        if(err){
            res.status(400).send(err);
        }    
        else{
            res.json(reminders);
        }    
    });   
});

app.route("/reminder/:id")    
    .delete(function(req,res){
    	Reminder.remove({_id : req.params.id}, (err, result) => {
            if(err){
                res.status(400).send(err);
            }
            else{
                res.json({ message: "Reminder successfully deleted!", result });
            }        
    });
});    

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing



