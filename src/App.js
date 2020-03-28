import React, {useState,useContext}from 'react';
import { BrowserRouter as Router, Switch, Route ,Redirect} from "react-router-dom"
import './App.css';

//components
import Header from './component/header'
import Landing from './component/pages/landing'
import Signinpage from './component/pages/signinPage'
import Homepage from './component/pages/home'
import PrivateRoute from './component/privateRoute'
import Image from './component/test/Image'
import Uploadimage from './component/test/Uploadimage'
//includes
import './Assets/css/styles.min.css'//css file

export const AuthContext = React.createContext(null);


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return(
  //   <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
  //     <Router>
  //       <div className="App">
  //         <Header/>
  //         <Switch>
  //           <Route exact path="/" component={Landing} />
  //           <Route exact path="/signin" component={Signinpage} />
  //           <PrivateRoute exact path="/home" component={Homepage} /> 
  //         </Switch>

  //       </div>
  //     </Router> 
  //  </AuthContext.Provider>
  // <Image />
  <Uploadimage />
  )
  
}

export default App;
