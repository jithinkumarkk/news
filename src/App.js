import React from "react";
import './App.css'; 
import SearchBar from "./components/SearchBar";
import NavBar from './components/NavBar'; 
import WeatherInfo from './components/WeatherInfo';
import InfiniteNews from "./components/InfiniteNews"; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from "./components/Footer";
import DatePicker from "./components/Calender";  
import { News_Api_Key } from "./components/ApiKey";
import NewsPlaceholder from "./components/PlaceHolder";
import SearchItemList from "./components/searchList";
const  getNews = async topic => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&apiKey=${News_Api_Key}`
  );
  const json = await response.json();
  console.log(json);
  return json;
};

class App extends React.Component {

  
  state = {
    Newsarticles: [],
    searchNewsTopic: "",
    totalNewsResults: "",
    Searchloading: false,
    NewsapiError: "",
  };
  searchNewsTopic = async topic => {
    try {
      this.setState({ loadSearchloadinging: true });
      const response = await getNews(topic);
     // alert(response.totalResults);
      this.setState({
        Newsarticles: response.articles,
        searchNewsTopic: topic,
        totalNewsResults: response.totalResults
      });
     window.history.push("/searchresults");
    } catch (error) {
      this.setState({ NewsapiError: "Could not find any articles" });
    }
    this.setState({ Searchloading: false });
  };
  render() {
   const {
    Newsarticles,
    NewsapiError,
    Searchloading,
    searchNewsTopic,
    totalNewsResults
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
                <div className="search-bar"> <SearchBar searchNewsTopic={this.searchNewsTopic} ></SearchBar></div> 
                <div><WeatherInfo></WeatherInfo></div>
            </div>
            <div className="clear"></div> 
            <div className="header-bottom-wrap d-flex justify-content-between align-items-center">
         
               <NavBar></NavBar>
               <div className="DatePick">
              <DatePicker/>
              </div>
            </div>  
    
        </div> 
       </div>
       <div className="content"> 
       <div className="section-wrapper row"> 
         <div className="news-container">  

            {Newsarticles.length > 0 && <SearchItemList articles={Newsarticles}/> }
            <Switch>
              <Route exact path="/"><InfiniteNews key="general" country="in" category="general"/></Route> 
              <Route exact path="/business"><InfiniteNews key="business" country="in" category="business"/></Route> 
              <Route exact path="/entertainment"><InfiniteNews key="entertainment" country="in" category="entertainment"/></Route> 
              <Route exact path="/general"><InfiniteNews key="general" country="in" category="general"/></Route> 
              <Route exact path="/health"><InfiniteNews key="health" country="in" category="health"/></Route> 
              <Route exact path="/science"><InfiniteNews key="science" country="in" category="science"/></Route> 
              <Route exact path="/sports"><InfiniteNews key="sports" country="in" category="sports"/></Route> 
              <Route exact path="/technology"><InfiniteNews key="technology" country="in" category="technology"/></Route> 
              <Route exact path="/searchresults" Component={SearchItemList} />
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
// function LandingPage() {
//   return (
//   );
// }

export default App;
