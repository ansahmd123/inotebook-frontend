import React, { useContext, useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';


const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null)
    const refClose = useRef(null)
    let history = useHistory();
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    useEffect(() => {
        if (localStorage.getItem('token')) {

            getNotes();
        }
        else {
            history.push("/login")
            // alert("Please login with your credentials");
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();



    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container row my-3">
                <h1>Your Notes</h1>
                {notes.length === 0 && 'No notes to display'}
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
