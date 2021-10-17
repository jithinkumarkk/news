import React from 'react'; 
import SearchBar from "./SearchBar";
import NavBar from './NavBar';     
import WeatherInfo from './WeatherInfo'; 
import DatePicker from "./Calender";  
 
class Header extends React.Component {   
   constructor(props) {
      super(props);
      this.state = { searchTopic: "",searchDate: "" };
    }

    
    render() {
      return (   <>
      <div className="header">
         <div className="section-wrapper">
            <div className="header-container">
               <div className="logo">
                  <label for="check" class="checkbtn">
                  <input type="checkbox" id="check"/>
                  <i class="fa fa-bars"></i>
                  </label> 
                  <h2 id="logo-head">News App</h2>
               </div>
               <div className="search-bar"  style={{ flexBasis:0,flex:1 }}>                 
               <SearchBar searchForTopic={this.state.searchTopic} />
            </div>
            <div>
               <WeatherInfo></WeatherInfo>
            </div>
         </div>
         <div className="clear"></div>
         <div className="header-bottom-wrap d-flex justify-content-between align-items-center">
            <NavBar></NavBar>
            <div className="DatePick">
               <DatePicker />
            </div>
         </div>
      </div>
      </div>
   </>
   )
  }
 }
   export default Header; 