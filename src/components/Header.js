import React from 'react'; 
import SearchBar from "./SearchBar";
import NavBar from './NavBar'; 
import WeatherInfo from './WeatherInfo';
import Logo from './Logo';
const Header = () => ( 
    <>
    <div className="header-container"> 
         <Logo/>
         <SearchBar/> 
         <WeatherInfo/> 
    </div>
    <div className="clear"></div> 
    <div className="header-bottom-wrap d-flex justify-content-between align-items-center">
           <NavBar/> 
     </div>  
   </>
);
export default Header;    