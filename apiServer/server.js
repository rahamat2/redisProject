//Import dependencies
const express = require('express');

//Create our express app
const app = express()

//Routing
app.get('/', (req,res)=>{
    res.json({ hello:"world" });
});

//Start our server
app.listen(3000);