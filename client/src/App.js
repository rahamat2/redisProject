import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  //State
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title:"",
    body:"",
  });
  const [snote, setSnote] = useState(null);
  const [createSearchForm, setCreateSearchForm] = useState({
    noteId:"",
  });

  //UseEffect
  useEffect(()=>{
    fetchNotes();
  },[]);

  //Functions
  const fetchNotes = async () => {
    //Fetch the notes
    const res = await axios.get("http://localhost:3001/notes");
    //Set it on state
    setNotes(res.data.notes);
    //console.log(res);
  }

  const updateCreateFormField = (e)=>{
    const {name, value} = e.target;
    setCreateForm({
      ...createForm,
      [name]:value,
    });
    console.log({name, value});
  };

  const updateCreateSearchFormField = (e)=>{
    const {name, value} = e.target;
    setCreateSearchForm({
      ...createSearchForm,
      [name]:value,
    });
    console.log({name, value});
  };

  const createSearchNote = async (e)=>{
    e.preventDefault();

    //Create Note
    const res = await axios.get(`http://localhost:3001/notes/${createSearchForm.noteId}`);
    //const data = await res.json();
    console.log(res.data);

    //Update State
    //setSnote(createSearchForm.noteId);
    setSnote(JSON.stringify(res.data));

    //Clear form state
    setCreateSearchForm({noteId:''});

  };

  const createNote = async (e)=>{
    e.preventDefault();

    //Create Note
    const res = await axios.post("http://localhost:3001/notes", createForm);

    //Update State
    setNotes([...notes, res.data.note]);

    //Clear form state
    setCreateForm({title:'',body:''});

  };

  const deleteNote = async (_id)=>{
    //Delete note
    const res = await axios.delete(`http://localhost:3001/notes/${_id}`);
    //console.log(res);
    //Update state
    const newNotes = [...notes].filter((note)=>{
      return note._id !== _id;
    });
    setNotes(newNotes);
  };



  return (
    <div className="App">
      <div>
        <h2>Search Note</h2>
        <form onSubmit={createSearchNote}>
          <input onChange={updateCreateSearchFormField} value={createSearchForm.noteId} name="noteId" placeholder="Enter Note ID"/>
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        <h3>{snote}</h3>
      </div>
      <div>
        <h2>Create Note</h2>
        <form onSubmit={createNote}>
          <input onChange={updateCreateFormField} value={createForm.title} name="title" placeholder="Enter Title"/>
          <textarea onChange={updateCreateFormField} value={createForm.body} name="body" placeholder="Enter Body"/>
          <button type="submit">Create</button>
        </form>
      </div>
      <div>
        <h2>All Notes</h2>
        {notes && notes.map(note=>{
          return (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <h5>ID: {note._id}</h5>
            <h5>Body: {note.body}</h5>
            <button onClick={()=>deleteNote(note._id)}>Delete Note</button>
          </div>
          );
        })}
      </div>
    </div>
    ) ;
}

export default App;
