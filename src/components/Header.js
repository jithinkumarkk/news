import React from 'react'; 
import SearchBar from "./SearchBar";
import NavBar from './NavBar'; 
import WeatherModule from './weather';
const Header = () => ( 
  <>
    <div className="header-container">
       <div className="logo">
           <h2 id="logo-head">News App</h2> 
        </div>  
        <div className="search-bar"> <SearchBar></SearchBar></div> 
         <div><WeatherModule></WeatherModule></div>
    </div>
    <div className="clear"></div> 
        <div className="header-bottom-wrap d-flex justify-content-between align-items-center">
           <NavBar></NavBar>
          <div className="DatePick">
           <input type="date"/>
          </div>
         </div>  
   </>
   )
   export default Header; 