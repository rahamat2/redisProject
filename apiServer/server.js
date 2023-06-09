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

app.get('/notes', async (req,res)=>{
    //Find the notes
    const notes = await Note.find();
    //Respond with them
    res.json({notes: notes});
});

app.get('/notes/:id', async (req,res)=>{
    //Get the id from the URL
    const noteId = req.params.id;

    //Find the note using that id
    const note = await Note.findById(noteId);

    //Respond with the note
    res.json({ note: note });
});

app.put('/notes/:id', async (req,res)=>{
    //Get the id from the URL
    const noteId = req.params.id;

    //Get the data from request body
    const title = req.body.title;
    const body = req.body.body;

    //Find the note and update using that id
    const noteOld = await Note.findByIdAndUpdate(noteId, {
        title: title,
        body: body,
    });

    //Find the updated note
    const noteUpdated = await Note.findById(noteId);

    //Respond with the note
    res.json({ noteOld: noteOld, noteUpdated: noteUpdated });
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

app.delete('/notes/:id', async (req,res)=>{
    //Get the id from the URL
    const noteId = req.params.id;

    //Find the note using that id
    await Note.deleteOne({ _id: noteId});

    //Respond with the note
    res.json("Delete Success");
});

//Start our server
app.listen(process.env.PORT);