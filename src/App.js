import React from "react"; 
import 'semantic-ui-css/semantic.min.css'; 
import './App.css'; 
import SearchBar from "./components/SearchBar";
import NavBar from './components/NavBar'; 
import WeatherInfo from './components/WeatherInfo';
import InfiniteNews from "./components/InfiniteNews"; 
import {
  BrowserRouter as Router,
  Switch,Navigate,
  Route,
  Redirect,
} from "react-router-dom";
import Footer from "./components/Footer";
import DatePicker from "./components/Calender";  
import { News_Api_Key } from "./components/ApiKey";
import SearchItemList from "./components/searchList";
import { Container, Header } from "semantic-ui-react";
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
    articles: [],
    searchTopic: "",
    totalResults: "",
    loading: false,
    apiError: "",
    redirect: false,
  }; 
  
   

  searchForTopic = async topic => {
    try {
      this.setState({ loading: true });
      const response = await getNews(topic);
    
      this.setState({
        articles: response.articles,
        searchTopic: topic,
        totalResults: response.totalResults,
        redirect: true ,
        loading: false,
      });
      if (this.state.redirect) {
        alert(this.state.redirect);
         
      }  
    } catch (error) {
      this.setState({ loading: false,apiError: "Could not find any articles" });
    }
    this.setState({ loading: false });
  };

  render() {
    const {
      articles,
      apiError,
      loading,
      searchTopic,
      totalResults,
      redirect
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
          {loading && (
          <p style={{ textAlign: "center" }}>Searching for articles...</p>
         )}
       
        {apiError && <p>Could not fetch any articles. Please try again.</p>}

                </div> 
                <div><WeatherInfo></WeatherInfo></div>
            </div>
            <div className="clear"></div> 
            <div className="header-bottom-wrap d-flex justify-content-between align-items-center">
              <NavBar></NavBar>
             
               <div className="DatePick"   style={{ flex:1 }}>
              <DatePicker/>
              </div>
            </div>  
    
        </div> 
       </div>
       <div className="content"> 
       <div className="section-wrapper row"> 
         <div className="news-container">  

         {articles.length > 0 && (
          <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
            Found {totalResults} articles on "{searchTopic}"
          </Header>
        )}
            
            <Switch>
              <Route path="/"><InfiniteNews query={searchTopic} key="general" country="in" category="general"/></Route> 
              <Route exact path="/business"><InfiniteNews query="" key="business" country="in" category="business"/></Route> 
              <Route exact path="/entertainment"><InfiniteNews  query="" key="entertainment" country="in" category="entertainment"/></Route> 
              <Route exact path="/general"><InfiniteNews  query="" key="general" country="in" category="general"/></Route> 
              <Route exact path="/health"><InfiniteNews  query="" key="health" country="in" category="health"/></Route> 
              <Route exact path="/science"><InfiniteNews  query="" key="science" country="in" category="science"/></Route> 
              <Route exact path="/sports"><InfiniteNews  query="" key="sports" country="in" category="sports"/></Route> 
              <Route exact path="/technology"><InfiniteNews  query="" key="technology" country="in" category="technology"/></Route> 
              {/*<<Route path='/search'><InfiniteNews  query={searchTopic} key="" country="" category=""/></Route> 
              
              Route path="/search/:searchparams" component={InfiniteNews} /> <Route exact path="/searchresults"> 
              <InfiniteNews  query={this.Qtopic} key="" country="" category=""/> 
              </Route> */}
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
