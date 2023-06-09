//Import dependencies
const Note = require('../models/note');

const checkServer = (req,res)=>{
    res.json({ msg:"API Server is up" });
};

const fetchAllNotes = async (req,res)=>{
    //Find the notes
    const notes = await Note.find();
    //Respond with them
    res.json({notes}); //notes: notes = notes because they match
};

const fetchSingleNote = async (req,res)=>{
    //Get the id from the URL
    const noteId = req.params.id;

    //Find the note using that id
    const note = await Note.findById(noteId);

    //Respond with the note
    res.json({ note }); //note: note = note because they match
};

const createNote = async (req,res)=>{
    //Get the data from request body
    const {title, body} = req.body;
    // const title = req.body.title;
    // const body = req.body.body;


    //Create a note with it
    const note = await Note.create({
        title,
        body,
    });

    //Respond with the new note
    res.json({ note});
};

const updateNote = async (req,res)=>{
    //Get the id from the URL
    const noteId = req.params.id;

    //Get the data from request body
    const {title, body} = req.body;
    // const title = req.body.title;
    // const body = req.body.body;

    //Find the note and update using that id
    const noteOld = await Note.findByIdAndUpdate(noteId, {
        title,
        body,
    });

    //Find the updated note
    const noteUpdated = await Note.findById(noteId);

    //Respond with the note
    res.json({ noteOld, noteUpdated });
};

const deleteNote = async (req,res)=>{
    //Get the id from the URL
    const noteId = req.params.id;

    //Find the note using that id
    await Note.deleteOne({ _id: noteId});

    //Respond with the note
    res.json("Delete Success");
};


module.exports = {
    checkServer,
    fetchAllNotes,
    fetchSingleNote,
    createNote,
    updateNote,
    deleteNote,
};


