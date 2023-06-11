//Load env variables
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}


//Import dependencies
const express = require('express');
const cors = require('cors');
const redis = require("redis");
const connectToDb = require('./config/connectToDb');
const notesController = require('./controllers/notesController');
const Note = require('./models/note');

//Create our express app
const app = express();

//Configure express app
app.use(express.json());
app.use(cors());

//Connect to database
connectToDb();

//Create redis client
const redisclient = redis.createClient(); //default port 6379

//Connect redis client to redis server
(async () => {
    await redisclient.connect();
})();

//Redis connection check
redisclient.on("ready",  () => {
    console.log("Connected to Redis Server!");
});
  
redisclient.on("error", (err) => {
    console.log("Error Connecting to Redis Server: ", err);
});


//Routing
app.get('/', notesController.checkServer);
app.get('/notes', notesController.fetchAllNotes);
app.get('/notes/:id', async (req,res)=>{
    //Get the id from the URL
    const noteId = req.params.id;

    const cachedData = await redisclient.get(noteId); //key
    if(cachedData){
        res.json({note: JSON.parse(cachedData), chached:"Yes"});
    }else{
        try {
            const note = await Note.findById(noteId);
            if (note) {
                await redisclient.set(noteId, JSON.stringify(note));
            }
            res.json({note: note, chached:"No"});
        } catch (error) {
            res.json({note: null, chached:"No"});
        }
    }

});
app.post('/notes', notesController.createNote);
app.put('/notes/:id', notesController.updateNote);
app.delete('/notes/:id', notesController.deleteNote);

//Start our server
app.listen(process.env.PORT);