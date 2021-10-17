import React, { Component } from 'react';  
import PropTypes from 'prop-types'; 
import { News_URL } from './ApiKey'; 
import NewsPlaceholder from './PlaceHolder';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import equal from 'fast-deep-equal';
import NewsGrids from './NewsGrids';
import { Placeholder,  PlaceholderImage } from 'semantic-ui-react'

export default class InfiniteNews extends React.Component  {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
    query: '',
    searchDate:'',
    dateQuery:'', 
   }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    query: PropTypes.string,
    searchDate: PropTypes.string,
    dateQuery: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
        articles: [],
        loading: true,
        page: 1,
        totalResults: 0,
        grids: 5
    } 
  }
  async updateNews() {
    let url="";
    if(this.props.query)
    { 
       url = `${News_URL}&q=${this.props.query}&sortBy=popularity&language=en&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    }
    else if(this.props.searchDate)
    { 
       url = `${News_URL}&sortBy=publishedAt&from=${this.props.searchDate}&page=${this.state.page}&pageSize=${this.props.pageSize}&language=en`;
       this.setState({
        dateQuery :  false, 
      })
      }
    else
    {
       url = `${News_URL}&topic=${this.props.category}&category=${this.props.category}&sortBy=popularity&page=${this.state.page}&pageSize=${this.props.pageSize}&language=en`;
    }
    //alert(url);
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    if(parsedData.status == "error"){        
      alert(parsedData.message); 
      this.setState({
         loading: false, 
      })
      return; 
    }
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false, 
    })
  
  }
  async componentDidMount() {
    this.updateNews();
  }
  
  async componentDidUpdate(prevProps) {
    if( (!equal(this.props.query, prevProps.query) ) || (!equal(this.props.searchDate, prevProps.searchDate) ) ) //  
    {
      this.updateNews();
    }
  } 
  

  
  fetchMoreData = async () => {  
    this.setState({page: this.state.page + 1})
    let url="";
    if(this.props.query)
    { 
       url = `${News_URL}&q=${this.props.query}&sortBy=popularity&language=en&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    }
    else if(this.props.searchDate)
    { 
       url = `${News_URL}&sortBy=popularity&from=${this.props.searchDate}&page=${this.state.page}&pageSize=${this.props.pageSize}&language=en`;
    }
    else
    {
      url = `${News_URL}&topic=${this.props.category}&category=${this.props.category}&sortBy=popularity&page=${this.state.page}&pageSize=${this.props.pageSize}&language=en`;
    }
    //alert(url);
    let data = await fetch(url);
    let parsedData = await data.json();
    if(parsedData.status == "error"){ 
        alert(parsedData.message); 
        this.setState({
          loading: false, 
        })    
        return; 
    }
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
    })
  };
  capitalizeFirstLetter = (string) => {
    if(string == "general"){
      //string = "Latest News";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  getHeadLine() {
    if (this.props.query) {
      return  <>
      <div style={{ display: "flex", justifyContent: "space-between" ,maxWidth:"900px"}}>
        <p>Search Results of {this.props.query} </p> <p> Total Results {this.state.totalResults}</p>
      </div>          
     </>
    }
    else if (this.props.searchDate && !this.props.query) {
      return  <>
      <div style={{ display: "flex", justifyContent: "space-between" ,maxWidth:"900px"}}>
        <p>News On {this.props.searchDate} </p> <p> Total Results {this.state.totalResults}</p>
      </div> 
      </>
    } 
    else if (!this.props.searchDate && !this.props.query) {
      return  this.capitalizeFirstLetter(this.props.category)
    }
  }
   
  render() {
    return (
        <>
          {  
          this.props.category == "general" && this.props.dateQuery == false  && this.state.articles.length > 0 && 
          <NewsGrids data= {this.state.articles} />  
          }  
          {this.state.loading && <>
          <div class="news-grid-container">
          {Array.from(Array(this.state.grids)).map((x, index) =>
          <div className={"news-grid"+ index +" image-container"}>  
           <Placeholder>
             <PlaceholderImage/>
          </Placeholder> 
          </div>
          )}
          </div>
          </>
          }

         <h2 className="tag-line">
          { this.props.query && !this.props.searchDate && 
            <p style={{ display: "flex", justifyContent: "space-between" ,maxWidth:"900px"}}><span>Search Results of {this.props.query}</span> <span>Total Results {this.state.totalResults}</span></p>  
          }      

          { this.props.searchDate && !this.props.query && 
            <p style={{ display: "flex", justifyContent: "space-between" ,maxWidth:"900px"}}><span>News On {this.props.searchDate}</span> <span>Total Results {this.state.totalResults}</span></p>  
          } 

          { !this.props.searchDate && !this.props.query && 
            
            <p className="block-title"> 
             <div className="clear"><br></br></div> 
            <span>{ this.capitalizeFirstLetter(this.props.category) }</span> 
            <div class="block-subtitle">Latest</div> 
            </p> 
          }            
          
          </h2>
            <div className="clear"><br></br></div> 
          <div className="d-flex justify-content-between align-items-top d-flex-rows"> 
            <div className="news-container flex-basis-70">  
          {this.state.loading && <><NewsPlaceholder /><NewsPlaceholder /><NewsPlaceholder /><NewsPlaceholder />
            <div className="clear"><br></br></div> 
             <div align="center">
             <p>Loading....</p>
             </div>
             <div className="clear"><br></br></div> 
          
          </>}
        
          <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<><NewsPlaceholder /><NewsPlaceholder /><NewsPlaceholder /><NewsPlaceholder /></>}> 
              <div className="container">
              <div className="row">
                  {this.state.articles.map((element) => {
                      return <div  key={element.url}>
                          <NewsItem
                          title={element.title ? element.title : ""} 
                          description={element.description ? element.description : ""} 
                          imageUrl={element.urlToImage ?? element.image} 
                          newsUrl={element.url} 
                          author={element.source.name}
                          date={element.publishedAt} 
                          source={element.source.name} />
                      </div>
                  })}
              </div>
              </div> 
          </InfiniteScroll>
          </div>
          <div className="weather-card flex-basis-30">
           <div className="section-wrapper">
           <h2>Weather</h2>  
           </div> 
          </div>
         </div>   
        </>
    )
  } 
} 