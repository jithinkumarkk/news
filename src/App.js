import React from "react"; 
import 'semantic-ui-css/semantic.min.css'; 
import './App.css'; 
import SearchBar from "./components/SearchBar";
import NavBar from './components/NavBar'; 
import WeatherInfo from './components/WeatherInfo';
import InfiniteNews from "./components/InfiniteNews"; 
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";
import Footer from "./components/Footer";
import DatePicker from "./components/Calender";  
   
class App extends React.Component {
  state = {  
    searchTopic: "" ,
    searchDate: "",
    language:"",
  }; 
  ChangeLanguage = async language => {
    this.setState({
      language: language,
   });
  };

  searchForTopic = async topic => {
     this.setState({
      searchTopic: topic,
      searchDate: "",
    });
   };

   
  searchByDate = async Dates => {
    this.setState({
      searchDate: Dates,
      searchTopic: "",
   });
  };

  render() {
    const {
      searchTopic,searchDate
    } = this.state;
 return (   <div id="wrapper">
    <div id="main-content">
    <Router>
       <div className="header">
        <div className="section-wrapper">  
            <div className="header-container">
              <div className="logo">
                  <h2 id="logo-head">News App</h2> 
                </div>  
                <div className="search-bar"  style={{ flexBasis:0,flex:1 }}>                 
                <SearchBar searchForTopic={this.searchForTopic} />
                </div> 
                <div><WeatherInfo></WeatherInfo></div>
            </div>
            <div className="clear"></div> 
            <div className="header-bottom-wrap d-flex justify-content-between align-items-center">
              <NavBar></NavBar> 
               <div className="DatePick">
               <DatePicker searchByDate={this.searchByDate}/>
              </div>
            </div>  
    
        </div> 
       </div>
       <div className="content"> 
       <div className="section-wrapper row"> 
         <div className="news-container">  
            <Switch>
              <Route exact path="/"><InfiniteNews searchDate={searchDate}  query={searchTopic} key="general" country="in" category="general"/></Route> 
              <Route exact path="/business"><InfiniteNews searchDate={searchDate} query={searchTopic} key="business" country="in" category="business"/></Route> 
              <Route exact path="/entertainment"><InfiniteNews searchDate={searchDate}  query={searchTopic} key="entertainment" country="in" category="entertainment"/></Route> 
              <Route exact path="/general"><InfiniteNews searchDate={searchDate}  query={searchTopic} key="general" country="in" category="general"/></Route> 
              <Route exact path="/health"><InfiniteNews searchDate={searchDate}  query={searchTopic} key="health" country="in" category="health"/></Route> 
              <Route exact path="/science"><InfiniteNews searchDate={searchDate}  query={searchTopic} key="science" country="in" category="science"/></Route> 
              <Route exact path="/sports"><InfiniteNews searchDate={searchDate}  query={searchTopic} key="sports" country="in" category="sports"/></Route> 
              <Route exact path="/technology"><InfiniteNews searchDate={searchDate}  query={searchTopic} key="technology" country="in" category="technology"/></Route> 
            </Switch>
         </div> 
          <div className="trending-news">
          </div>
      </div>
      </div>
    </Router>    
    <Footer/>
    </div>
    </div>
    
    );
  }
}
 
export default App;
