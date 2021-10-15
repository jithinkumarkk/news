import React from "react";
import logo from './logo.svg';
import './App.css'; 
import Header from "./components/Header"; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <div id="wrapper">
      <div id="main-content">
      <Router>
      {/*header starts*/}
         <div className="header">
            <div className="section-wrapper">  
              <Header></Header>
            </div>
          </div>  
      {/*header finished*/}
      {/*content starts*/}
       <Switch>
       </Switch> 
      {/*content finished*/}
      </Router>  
      </div>
     </div> 
  );
}

export default App;
