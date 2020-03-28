import React, { useState, useContext } from 'react';
import firebase from "../firebase";
import {
  withRouter
} from 'react-router-dom'
import { AuthContext } from "./../App";

function Signup(props) {

    const Auth = useContext(AuthContext);
    const handleForm = e => {
      e.preventDefault();
      console.log(Auth);
      Auth.setLoggedIn(true);
    };
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    
    return (
      <div className="signup">
        <h2>Sign Up</h2>
        <form onSubmit={e => handleForm(e)}>  
        <div className="form-group">
            <label htmlFor='displayName' >Username:</label>
            <input
              type="text"
              name="displayName"
              onChange={event => {
                setUsername(event.target.value);
              }}
              value={username}
              id='displayName'
            />
          </div>
          <div className="form-group">
            <label htmlFor='email' >Email:</label>
            <input
              autoComplete="email"
              type="email"
              name="email"
              onChange={event => {
                setEmail(event.target.value);
              }}
              value={email}
              id='email'
            />
          </div>
          
          <div className="form-group">
            <label htmlFor='password' >Password:</label>
            <input
              autoComplete="new-password"
              type="password"
              name="password"
              onChange={event => {
                setPassword(event.target.value);
              }}
              value={password}
              id='password'
            />
          </div>
          <div className="form-group">
            <button type="submit" className="basicBtn"  onClick={onRegister}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
    async function onRegister(){
      try{
        await firebase.register(username, email, password)
        props.history.push('/home')
      }catch(e){
        alert(e.message)
      }
    }
  }

  export default withRouter(Signup)
