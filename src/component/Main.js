import React from 'react'
import Notes from './Notes';

const Main = (props) => {
  const {showAlert} = props;
  return (
    <Notes showAlert={showAlert}/>
  )

}

export default Main;
