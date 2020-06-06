import React, { useEffect, useState } from 'react'

import axios from "axios";
export default function Login() {
    const [session, setSession] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [name,setname] = useState('')
    const [surname,setSurname] = useState('')
    const [id,setId] = useState('')
    const loginPSU = (e) => {
      e.preventDefault();
      axios
        .post("http://localhost/psu_auth", {
          username,
          password,
        })
        .then((response) => {
          // console.log(response.data.massage);
          if(response.data.massage){
            alert("PSU PASSPORT or Password is incorrect!!!")
          }
          console.log(response.data)
          if(response.data.PSU_PASSPORT.token){
              localStorage.setItem("Token", JSON.stringify(response.data.PSU_PASSPORT));
              setSession(true)
              setToken(response.data.PSU_PASSPORT.token);
          }
         
          setname(response.data.PSU_PASSPORT.firstname)
          setSurname(response.data.PSU_PASSPORT.lastname)
          setId(response.data.PSU_PASSPORT.stID)
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    const logout = () => {
     localStorage.removeItem("Token",setSession(false))
     setToken('');
      // setSession(false)
    };
    // console.log("Token",localStorage.getItem("Token"));   
    useEffect(() => {
      //change titele
     if(token!==''){
       document.title="Login success"
     }
     return()=>{
        //Cleanup tilte
       document.title="Login PSU Passport"
     }
    }, [token]);

    const printData=()=>{
      if(session==true){
        return (
        <div style={{fontFamily:"Prompt",textAlign:"center"}}>
         <h1>{name} {surname} รหัสนักศึกษา {id}</h1>
      {/* <p2>{token}</p2> */}
         <button onClick={logout}>Logout</button>
        </div>
      );
      }
      else{
        return(
          <div>
            <h2>PSU LOGIN</h2>
            <div>
                <label>PSU Passport : </label>
                <input type='text' onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password : </label>
                <input type='password' onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
                <button onClick={loginPSU}>Login</button>
            </div>
           
        </div>
        );
      }
    }  
    return (
        <div>
          {printData()}
        </div>
    )
}
