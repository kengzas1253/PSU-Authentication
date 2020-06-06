import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function Student() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [surname, setSurname] = useState('');
  const [id, setID] = useState('');
  const [year,setYear] = useState(' ')
  const [loginStatus, setLoginStatus] = useState('Not Logged in');
  
  const login = async ()=>{
    const res = await axios.post('http://localhost/psu_auth', { username, password });
    if(res.data.stID !=='' && res.data.firstname !==''){
        // setLoginStatus(JSON.stringify(res.data))
        setLoginStatus("Login Success")
        setname(res.data.firstname)
        setSurname(res.data.lastname)
        setID("รหัสนักศึกษา "+res.data.stID)
        setYear("ชั้นปีที่ "+ res.data.year)
    }
    else{
        setLoginStatus("Try Agian")
        alert("Username or password is incorrect");
        setname('')
        setSurname('')
        setID('')
        setYear('')
    }
  }

  return (
    <div className="container-lg">
        <h2>PSU Passport LOGIN Show Data</h2>
        <div>
            <label>PSU Passport : </label>
            <input  className="form-control" type='text' onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
            <label>Password : </label>
            <input className="form-control" type='password' onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
            <button className="btn btn-secondary" 
            onClick={login} style={{marginTop:"10px"}}>Shows</button>
        </div>
        <div style={{ color: 'blue' }}>
           <h1> {loginStatus} </h1>
            <h1>{name} {surname} {id} {year}</h1>
        </div>
    </div>
  )
}
