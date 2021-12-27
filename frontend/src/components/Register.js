import axios from 'axios';
import React, { useState } from 'react'

export default function Register() {
  const [email, setEmail ] = useState('afnan.aldohime@gmail.com')
  const [password, setPassword] = useState('123')
  const [username, setUsername] = useState('nnonni1')
  
 const registerFunc = (e)=>{
   e.preventDefault();
 const newUser ={
     //es6
     email,
     password,
     username,
 };
 axios 
  .post('http://localhost:5000/user/register',newUser)
  .then((response) => {
      console.log('DATA:', response.data);
  })
  .catch((err)=>{
      console.log('ERR', err);
  });
 }; 
  
  return (
        <div className='register'>
            <form action=''>
            <label htmlfor='email'>Email </label>
            <input type="text" placeholder='whrite text here ...'
             onChange={(e)=>{
            setEmail(e.target.value)}} value={email}/>
            <br/>
            <label htmlfor='password'>Password </label>
            <input type="password" placeholder='whrite password here ... ' 
             onChange={(e)=>{
            setPassword(e.target.value)}} value={password}/>
            <br/>
            <label htmlfor='username'>Username </label>
            <input type="text" placeholder='whrite username here ...'
             onChange={(e)=>{
             setUsername(e.target.value)}}
             value={username}/>
            <br/>
            <input type='submit' value='Register' onClick={registerFunc} />      
            </form>
        </div>
    )
}
