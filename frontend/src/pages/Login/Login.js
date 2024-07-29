import "./Login.css";
 //import React from 'react';
//import { Alert } from "@material-tailwind/react";
import image from "../imageback.jpg"
import React, { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API_URL}/api/user/login`, {
        email,
        password
      });
      if (response.data.success) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('username' , response.data.username);
        history('/userpage')
        // history(`/${encodeURIComponent(email)}`, { state: { id: email } });
        alert("Login successful!");
        window.location.reload();
      } 
      else if (response.data === "notexist") {
          alert("User not found");
          history("/register");
        } 
        else {
          alert("password is incorrect");
        }
    }
     catch (error) {
      alert("server error");
      console.error(error);
    }
  };
  useEffect(() =>{
    if(localStorage.getItem('userEmail')){
      history('/')
    }
  } , [history] )

  return (
    <div className={`mt-4 flex items-center justify-center h-full`} style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }} >
      <div className="boxes">
        <h1 className={`text-2xl font-bold mb-4 text-deep-blue `}>Login</h1>

        <form onSubmit={submit} >
          <div className={`mb-4`}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`w-1/2 p-2 border border-gray-300 rounded text-black`}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-1/2 p-2 border border-gray-300 rounded text-black`}
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full bg-blue text-white p-2 rounded`}
            >
              Login
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;
