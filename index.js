const express = require('express'); //for getting the express package
const path = require('path');
const { stringify } = require('querystring');
const port = 8000; //port setup

//for database
const db = require('./config/mongoose');
const Tasks = require('./model/todoApp'); // this tasks will be used for populating and creating

const app = express();


//setting up view engine
app.set('view engine','ejs'); 
app.set('views', path.join(__dirname,'views'));

app.use(express.urlencoded());

app.use(express.static('assets')); //static files provide functionality to your page, epress.static() is a inbuild function


// fetching from database
app.get('/', function(request, response){
     Tasks.find({}, function(err, tasks){
        if(err){
            console.log("Error in fetching tasks from db");
            return;
        }
        return response.render('home',{
            title: "The ToDo App",
            todo_list: tasks
        });
    });
});

// populating the database
app.post('/create-task', function(request, response){
    Tasks.create({
        description: request.body.description,
        category: request.body.category,
        date: request.body.date
    }, function(err, newTask){
        if(err)
        {
            console.log('Error in creating a task!')
            return;
        }
            console.log('******', newTask);
            return response.redirect('back');
    })
  

});


// Deleting from the database
app.post('/delete-task/', function(request, response){
    var selected=[];
   
    for(var key in request.body){
        selected=request.body[key];
    }
    
    Tasks.remove({_id:{$in:selected}},function(err, data){
        if (err) throw err;
         response.redirect('back');
    });
});

app.listen(port,function(err){

    if(err){
        //used interpolation
        console.log(`Error: ${err}`);
        return;
    }
    
    console.log(`Server is up and running on port: ${port}`);

});