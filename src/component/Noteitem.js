import React, { useContext } from 'react'
import NoteContext from '../Context/NoteContext';

const Noteitem = (props) => {
    const { note,update } = props;
    const context= useContext(NoteContext)
    const {deleteNote} = context;
    const onclick=()=>{
        deleteNote(note._id)
        props.showAlert("success","fa-solid fa-circle-check","#198754","Note has been DELETED successfully")
    }
    return (
        <div className='col-md-3 my-2 mx-3'>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
                    <i className="fa-solid fa-trash-can mx-3" onClick={onclick}></i>
                    <i className="fa-solid fa-pen-to-square"onClick={()=> { return update(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;
