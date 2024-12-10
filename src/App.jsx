import "../src/styles/App.css"
import { useState, useEffect } from 'react'
import Login from "./components/Login"
import Signup from './components/Signup'
import Dashboard from "./components/Dashboard"
import {Routes, Route} from 'react-router-dom'

function App() {
  const [token, setToken] = useState("");
  console.log("inside App 1")
  useEffect(() => {
    if (token) {
      console.log("inside App 2")
      localStorage.setItem("token", token)
      console.log("2: ", token)
    } else if (/* token == "" &&  */localStorage.getItem("token")) {
      console.log("inside App 3")
      setToken(localStorage.getItem("token"))
      console.log("3: ", token)
    }
  }, [token])
  console.log("inside App 4")
  
  return (
    <div>
      <Routes>
        <Route path="/auth-with-react" element={<Signup setToken={setToken} token={token}/>}></Route>
        <Route path="/auth-with-react/login" element={<Login setToken={setToken} token={token}/>}></Route>
        <Route path="/auth-with-react/dashboard" element={<Dashboard token={token} setToken={setToken} />}></Route>

      </Routes>
    </div>
  )
}

export default App