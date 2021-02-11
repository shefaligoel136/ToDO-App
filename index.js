const express = require('express'); //for getting the express package
const path = require('path');
const port = 8000; //port setup

//for database
const db = require('./config/mongoose');
const Tasks = require('./model/todoApp'); // this tasks will be used for populating and creating

// for express
const app = express();


//setting up view engine
app.set('view engine','ejs'); 
app.set('views', path.join(__dirname,'views'));

// for extracting form data
app.use(express.urlencoded());

app.use(express.static('assets')); //static files provide functionality to your page, epress.static() is a inbuild function


// fetching from database
app.get('/', function(request, response){
     Tasks.find().sort({'_id':-1}).exec(function(err, tasks){
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
            return response.redirect('back');
    })
});


// Deleting from the database
app.post('/delete-task/', function(request, response){
    var selected=[];
   
    for(var key in request.body){
        selected=request.body[key];
    }
    
    Tasks.deleteMany({_id:{$in:selected}},function(err, data){
        if (err) throw err;
         response.redirect('back');
    });
});


// its a function which sorts the tasks according to the most recent dates
app.get('/sort-near',function(request,response){
    Tasks.find().sort('date').exec(function(err, tasks) {
        if(err){
            console.log("Error in fetching tasks from db");
            return;
        }
        return response.render('home',{
            title: "The ToDo App",
            todo_list: tasks
        });
      })
})

// its a function which sorts the tasks according to the farthest dates
app.get('/sort-far',function(request,response){
    Tasks.find().sort('-date').exec(function(err, tasks) {
        if(err){
            console.log("Error in fetching tasks from db");
            return;
        }
        return response.render('home',{
            title: "The ToDo App",
            todo_list: tasks
        });
      })
})

app.listen(port,function(err){

    if(err){
        //used interpolation
        console.log(`Error: ${err}`);
        return;
    }
    
    console.log(`Server is up and running on port: ${port}`);

});