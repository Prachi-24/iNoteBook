import React,{useState} from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from "./component/Navbar";
import Alert from "./component/Alert";
import Main from "./component/Main";
import About from "./component/About";
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  // for alert
  let [alert, setAlert] = useState(null)
  const showAlert=(type, icon,iconColor, message) =>{
    setAlert({
      type:type,
      icon:icon,
      iconColor:iconColor,
      msg:message
    })
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }
  
  // use dark mode
  const [mode, setMode] = useState('light')
  const toogleBtn=()=>{
    if(mode==='light'){
      setMode("dark")
      document.body.style.backgroundColor = '#04203c';
    }
    else{
      document.body.style.backgroundColor = '#fff';
    }
  }
  return (
    <>
    <BrowserRouter>
    <Navbar showAlert={showAlert} mode={mode} toogleBtn={toogleBtn}/>
    <Alert alert={alert}/>
    <Routes>
      <Route exact path="/" element={<Main showAlert={showAlert}/> }/>
      <Route exact path="/about" element={<About/>}/>
      <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
      <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
