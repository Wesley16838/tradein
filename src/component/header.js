import React,{useContext} from 'react';
import { BrowserRouter as Router,  Route, Link } from "react-router-dom"
import {
  withRouter
} from 'react-router-dom'
import { AuthContext } from "./../App";
import firebase from './../firebase'
function Header(props) {
  const Auth = useContext(AuthContext);
  return (
    <header>
      <AuthContext.Consumer>
      {({ isLoggedIn }) => (
        <React.Fragment>
          <div className='headerLeft'>
          <div className="logo">
              {
                  isLoggedIn
                  ?  <Link to="/home"><h1>HeartTrade</h1></Link>
                  :  <Link to="/"><h1>HeartTrade</h1></Link>
              }
          </div>
          </div>
          
          <nav>
              <ul>
                  <li>
                  
                  {
                      isLoggedIn
                      ? <Link className="basicBtn" to='/' onClick={logout}>Log Out</Link> 
                      : <Link className="basicBtn" to='/signin' >Sign In</Link> 
                  }
                    
                  </li>
              </ul>
          </nav>
        </React.Fragment>
      )}
      
      </AuthContext.Consumer>
    </header>
  );
  async function logout() {
    await firebase.logout()
    Auth.setLoggedIn(false);
		props.history.push('/')
	}
}



export default  withRouter(Header);