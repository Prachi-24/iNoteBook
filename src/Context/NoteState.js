import NoteContext from "./NoteContext";
import React, { useState } from 'react';


const NoteState = (props) => {
  const detail = []
  const host = "http://localhost:5000"
  const [data, setData] = useState(detail);

  // get all notes from backend
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchnotes`
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setData(json);
  }

  // Add a note
  const addNote = async ({ title, description, tag }) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
    setData(data.concat(note))
  }
  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)
    const newNote = data.filter((note) => { return note._id !== id })
    setData(newNote)
  }
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Accept": " */*",
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();
      console.log(json);
      let newData = JSON.parse(JSON.stringify(data));
      for (let index = 0; index < newData.length; index++) {
        const element = newData[index];
        if (element._id === id) {
          newData[index].title = title;
          newData[index].description = description;
          newData[index].tag = tag;
          break;
        }
      }
      console.log(id, newData)
      setData(newData)
    } catch (err) {
      console.log("your url is not correct")
    }
  };

  return (
    <NoteContext.Provider value={{ data, addNote, deleteNote, getNotes, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
