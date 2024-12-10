import {useState, useEffect} from 'react'
import axios from 'axios'
import "../styles/Signup.css"
import { useNavigate, Link } from 'react-router-dom'

const Signup = ({setToken, token}) => {
    const [user, setuser] = useState({
        name: "", email: "", password: "", cpassword: ""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    let {name, email, password, cpassword} = user;
    console.log("before navigate effect")
    useEffect(() => {
        if (token) {
            console.log("inside navigate effect")
            navigate("/auth-with-react/dashboard")
        }
    },[token])
    console.log("after navigate effect")
    
    const handleChange = (e) => { 
        let value = e.target.value;
        let key = e.target.name;
        setuser({...user, [key]: value})
        
    }


    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (!name || !email || !password || !cpassword) {
            setErrorMsg("Fill all the fields in the form")
            return
        }
        if (password !== cpassword) {
            setErrorMsg("Password and Confirm password should be same")
            return
        }
        try {
            const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup", user);
            console.log(response.data)
            setToken(response.data.data.token)
            setuser({name: "", email: "", password: "", cpassword: ""})
            navigate("/auth-with-react/login")
        } catch (error) {
            console.log(error);
            setErrorMsg(error.response.data.message)
        }

    }



    return (
        <div className="signup-form">
            <h1>Sign Up Form</h1>
            {errorMsg && <p style={{color: "red", fontSize: "small"}}>{errorMsg}</p>}
            <form id="signup-form" onSubmit={handleSubmit}>
                <input type="text" placeholder='Name'
                    onChange={handleChange}
                    name='name'
                    value={name}
                />
                <input type="email" placeholder='Email'
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <input type="text" placeholder='Password' 
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <input type="text" placeholder='Confirm Password'
                    onChange={handleChange}
                    name='cpassword'
                    value={cpassword}
                />
                <span>Already have an account? <Link className='goto' to="/login">Click here</Link> </span>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Signup