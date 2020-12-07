const express = require('express'); //for getting the express package
// const path = require('path');
const port = 8000; //port setup

const app = express();

// use express router
app.use('/', require('./routes/index'));

// app.set('view engine','ejs'); // creates a property view engine and gives a value ejs.
// app.set('views',path.join(__dirname,'views')); // will look for folder views inside __dirname

// app.use(express.static('assets')); //static files provide functionality to your page, epress.static() is a inbuild function

app.get('/',function(request,response){
    return response.render('home',
        {
            title : "The To-Do List"
        }
    );
});

app.listen(port,function(err){

    if(err){
        //used interpolation
        console.log(`Error: ${err}`);
        return;
    }
    
    console.log(`Server is up and running on port: ${port}`);

});