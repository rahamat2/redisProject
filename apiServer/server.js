//Load env variables
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}


//Import dependencies
const express = require('express');
const connectToDb = require('./config/connectToDb');
const Note = require('./models/note');

//Create our express app
const app = express()

//Configure express app
app.use(express.json());

//Connect to database
connectToDb();

//Routing
app.get('/', (req,res)=>{
    res.json({ hello:"world" });
});

app.post('/notes', async (req,res)=>{
    //Get the data from request body
    const title = req.body.title;
    const body = req.body.body;

    //Create a note with it
    const note = await Note.create({
        title: title,
        body: body
    });

    //Respond with the new note
    res.json({ note: note });
});

//Start our server
app.listen(process.env.PORT);