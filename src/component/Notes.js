import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../Context/NoteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
const Notes = (props) => {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  // eslint-disable-next-line  
  const { data, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({id : " ",etitle: "", edescription: "", etag: "" })
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const onclick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("success","fa-solid fa-circle-check","#198754","Note has been  UPDATED successfully")
  }
  return (
    <>
      <div className='container'>
        <Addnote showAlert={props.showAlert} />

        <button type="button" className="btn btn-primary d-none" ref={ref} href="#foo" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg ">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className=''>
                  <div className="mb-2 my-2">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' minLength={5} value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />

                  </div>
                  <div className="mb-2">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription"  minLength={5} value={note.edescription} name='edescription' onChange={onchange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onchange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={onclick}>Update Note</button>
              </div>
            </div>
          </div>
        </div>
        <div className='row my-4 '>
          <h2 className=''>your Note</h2>
          <div className='container mx-3'>
          {data.length === 0 && 'there is no Note to display'}
          </div>
          {data.map((note) => {
            return <Noteitem note={note} update={updateNote} key={note._id} showAlert={props.showAlert} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes;
