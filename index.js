const express = require('express'); //for getting the express package
const port = 8000; //port setup

const app = express();

app.listen(port,function(err){

    if(err){
        //used interpolation
        console.log(`Error: ${err}`);
        return;
    }
    
    console.log(`Server is up and running on port: ${port}`);

});