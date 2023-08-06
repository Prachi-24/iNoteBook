import React, { useContext } from 'react'
import NoteContext from '../Context/NoteContext';
import { useState } from 'react';

const Addnote = (props) => {
    const context= useContext(NoteContext)
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""})

    const onchange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }

    const onclick=(e)=>{
        e.preventDefault();
        addNote(note)
        setNote({title:"",description:"",tag:""})
        props.showAlert("success","fa-solid fa-circle-check","#198754","Note has been  ADDED successfully")
    }
    return (
        <>
            <div className='container my-4'>
                <h1 className='text-center'>Add a Note</h1>
                <form className=''>
                    <div className="mb-2 my-2">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' minLength={5} value={note.title} aria-describedby="emailHelp" onChange={onchange}/>

                    </div>
                    <div className="mb-2">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" minLength={5} value={note.description} name='description'onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag'value={note.tag} onChange={onchange} />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={note.title.length<5 || note.description.length<5} onClick={onclick}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default Addnote;
