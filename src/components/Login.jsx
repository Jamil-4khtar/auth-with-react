import "../styles/Login.css"
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Login({setToken, token}) {
    const [user, setUser] = useState({
        email: "", password: ""
    })
    let {email, password} = user;
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/auth-with-react/dashboard")
        }
    })

    const handleChange = (e) => { 
        let value = e.target.value;
        let key = e.target.name;
        setUser({...user, [key]: value})
    }
    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (!email || !password) {
            setErrorMsg("Fill all the fields in the form")
            return
        }
        try {
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login", user);
            console.log(response.data)
            setToken(response.data.data.token)
            setUser({email: "", password: ""})
            navigate("/auth-with-react/dashboard")
        } catch (error) {
            console.log(error);
            setErrorMsg(error.response.data.message)
        }
    }





  return (
    <div className="login-form">
        <h1>Login Form</h1>
        {errorMsg && <p style={{color: "red", fontSize: "small"}}>{errorMsg}</p>}
        <form id="login-form" onSubmit={handleSubmit}>
            <input type="email" 
                placeholder="Email"
                onChange={handleChange}
                value={email}
                name="email"
            />
            <input type="text" 
                placeholder="Password"
                onChange={handleChange}
                value={password}
                name="password"
            />
            <span><Link className="goto" to="/">Go to sign up</Link> if you're new here</span>

            <button>Login</button>
        </form>
    </div>
  )
}

export default Login

