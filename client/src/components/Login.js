import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from "../utils/AxiosWithAuth";
import axios from 'axios';


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

   const  history  = useHistory();

  const [login, setLogin] = useState(
     {
        username: "",
        password: ""
     }
  )
  const  handleChange = (e) => {
   e.persist();
   setLogin( 
      { ...login, [e.target.name]: e.target.value } );
 };

 const handleSubmit = (e) => {
   e.preventDefault();
   // Make a POST request and send the credentials object to the api
   //console.log("LOGIN", login);
   axiosWithAuth()        // sending to api
     .post("/api/login", login)
     .then((res) => {             // protected route looking for "token"
       window.localStorage.setItem("token", res.data.payload);
       // redirect
       history.push("/bubblepage");
     })
     .catch((err) => console.log(err));
 };


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
            
        <label htmlFor="username">
           Username 
          <input
            type="text"
            name="username"
            value={login.username}
            onChange={handleChange}
          />
         </label>

         <label htmlFor="password">
           Password
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
          />
          </label>
          <button>Log in</button>
      </form>
      
    </>
  );
};

export default Login;
