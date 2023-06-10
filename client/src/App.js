import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  //State
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title:"",
    body:"",
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
        <h2>Notes</h2>
        {notes && notes.map(note=>{
          return (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <button onClick={()=>deleteNote(note._id)}>Delete Note</button>
          </div>
          );
        })}
      </div>
      <div>
        <h2>Create Note</h2>
        <form onSubmit={createNote}>
          <input onChange={updateCreateFormField} value={createForm.title} name="title"/>
          <textarea onChange={updateCreateFormField} value={createForm.body} name="body"/>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
    ) ;
}

export default App;
