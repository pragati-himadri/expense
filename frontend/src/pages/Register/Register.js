
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Register.css"
import { API_URL } from "../../config";
import image from "../imageback.jpg";

function Register() {
    const history=useNavigate();
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    async function submit(e){
        e.preventDefault();

        try{
          const response = await axios.post(`${API_URL}/api/user/register`, {
            username,
            email,
            password,
            isAdmin: isAdmin ? true : false,
          });
          console.log(response.data);
          if (response.data === "exist") {
            alert("User already exists");
          } else if (response.data === "notexist") {
            // Registration success
            alert("Registration successful");
      
            // Optionally, redirect to another page or perform other actions
            history("/login", { state: { id: email } });
          }      
        }
        catch(e){
            console.log(e);
            alert("Invalid email or password");
        }}
        useEffect(() =>{
          if(localStorage.getItem('userEmail')){
            history('/')
          }
        } , [history] )

    return (
        <div className="register" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }} >
            <div className="boxes">

            <h1>Register</h1>
            <form action="POST" >
                 <input type="username" onChange={(e) => { setUsername(e.target.value) }} placeholder="username"  />
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <label >Are you Admin?
                <input type="checkbox" onChange={(e) => { setIsAdmin(e.target.value) }}   />
                </label>
                <input type="submit" onClick={submit} />

            </form>
            </div>

        </div>
    )
}

export default Register;


