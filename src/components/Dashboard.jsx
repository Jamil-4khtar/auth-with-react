import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import "../styles/Dashboard.css"


const Dashboard = ({token ,setToken}) => {
    const [pun, setPun] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()
    console.log("A")
    console.log(token)

    useEffect(() => {    
        if (!token) {
            console.log("B")
            navigate("/auth-with-react/login")
        }
    
    }, [token])

    

    useEffect(() => {
        const fetchZuku = async () => {
            console.log("C")
            try {
                const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response)
                setPun(response.data.data.message)
                setErrorMsg("")
            } catch (error) {
                console.log(error)
                setErrorMsg(error.response.data.message)
            }
        }
        fetchZuku()
    }, [])
    
    const handleLogout = async () => { 
        try {
            const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            setToken("")
            localStorage.removeItem("token")
            // navigate("/login")

        } catch (error) {
            console.log(error)
        }
     }

  return (
    <div className='dashboard'>
        <button className='logout-button' onClick={handleLogout}>Log out</button>
    {pun && (
      <div className="comical">
        <div className="comical-content">
          <q>{pun}</q>
        </div>
      </div>
    )}
    {errorMsg && <p>{errorMsg}</p>}
  </div>
  )
}

export default Dashboard