import React,{useState}  from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const navigate = useNavigate();
    const [credential, setCredential] = useState({email : "",password : ""})
    const submitform = async(e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body : JSON.stringify({ email: credential.email, password: credential.password })
          });
          const json = await response.json();
          console.log(json)
          if(json.success){
            //add token to localstorage and redirect
            localStorage.setItem("token",json.authToken)
            navigate('/');
            props.showAlert("success","fa-solid fa-circle-check","#198754","You've LOGGED in successfully")
        }
          else{
            props.showAlert("danger","fa-solid fa-triangle-exclamation","#DC3545","invalid detail")
          }
    }
    const onChange=(e)=>{
        setCredential({...credential,[e.target.name]: e.target.value})
    }
    return (
        <div className='container my-4' style={{ width: "50%", margin: "auto" }}>
            <h2 className='my-4 text-center'>Login Page</h2>
            <form onSubmit={submitform}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={credential.email}  id="email"  onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credential.password} onChange={onChange} id="password" />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
