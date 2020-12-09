// require library
const mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/todo_app_db');

//aquire the connection to check if it is successfull
const db = mongoose.connection;

// if theer is an error display it
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running print message
db.once('open',function(){
    console.log('Success! Connceted to database');
});