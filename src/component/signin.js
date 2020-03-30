import React, { useState, useContext } from 'react';
import {
  withRouter
} from 'react-router-dom'
import firebase from "../firebase";
import { AuthContext } from "./../App";
import axios from 'axios'
function Login(props) {
    const Auth = useContext(AuthContext);
    const handleForm = e => {
      e.preventDefault();
      Auth.setLoggedIn(true);
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div className="signin">
        <h2>Sign In</h2>
        <form onSubmit={e => handleForm(e)}>  
        
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
            <button type="submit" className="basicBtn"  onClick={login}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
    async function login() {
      try {
        console.log('login in')
        let lat = localStorage.getItem('lat')
        let lng = localStorage.getItem('lng')
        console.log('lat,',lat)
        console.log('after location')
        await firebase.login(email, password)  
        console.log('af firebase')
        let user = await axios.get('http://localhost:3007/get_user_by_email?email='+email+'&Lat='+lat+'&Long='+lng) 
        console.log('af api') 
        localStorage.setItem('userId',user.data._id)
        props.history.replace('/home')
      } catch(error) {
        alert(error.message)
      }
    }
  }

  export default withRouter(Login)