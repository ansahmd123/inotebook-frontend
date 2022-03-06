import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = 'http://localhost:5000'

  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)

  // Get all notes
  const getNotes = async (title, description, tag) => {

    // api call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });

    const json = await response.json()
    // console.log(json)
    setNotes(json)
  }

  // Add a note
  const addNotes = async (title, description, tag) => {

    // api call marna hai
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note=await response.json()
    setNotes(notes.concat(note))
  }

  // Delete a note

  const deleteNote = async (id) => {

    // todo api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });

    response.json();
    // const json=await response.json();
    // console.log(json);

    // logic to delete notes
    // console.log('deleting note with ' + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }

  // Edit a note

  const editNote = async (id, title, description, tag) => {
    // api 
    // console.log('edit note')
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })
    });

    response.json();
    // const json =await response.json();
    // console.log(json);


    let newNotes=JSON.parse(JSON.stringify(notes));

    // logic to edit in file
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setNotes(newNotes);
  }


  return (
    <noteContext.Provider value={{ notes, setNotes, addNotes, deleteNote, editNote, getNotes }}>
      {props.children}

    </noteContext.Provider>

  )

}

export default NoteState;