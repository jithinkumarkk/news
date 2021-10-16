import React, { Component } from 'react';  
import PropTypes from 'prop-types'; 
import { News_URL } from './ApiKey'; 
import NewsPlaceholder from './PlaceHolder';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
import equal from 'fast-deep-equal'

export default class InfiniteNews extends React.Component  {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
    query: '',
    searchDate:'' 
   }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    query: PropTypes.string,
    searchDate: PropTypes.string,
   }
  constructor(props) {
    super(props);
    this.state = {
        articles: [],
        loading: true,
        page: 1,
        totalResults: 0
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
      string = "Latest News";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  render() {
    return (
        <>
         <h2 className="tag-line"> 
        
           {this.props.query && 
            <>
            <div style={{ display: "flex", justifyContent: "space-between" ,maxWidth:"900px"}}>
            <p>Search Results of {this.props.query} </p> <p> Total Results {this.state.totalResults}</p>
            </div>
          
           </>
           }
            {this.props.searchDate && 
            
            <>
            <div style={{ display: "flex", justifyContent: "space-between" ,maxWidth:"900px"}}>
            <p>News On {this.props.searchDate} </p> <p> Total Results {this.state.totalResults}</p>
            </div> 
            </>
            }

           {!this.props.query || !this.props.searchDate && this.capitalizeFirstLetter(this.props.category)}</h2>
          <div className="clear"><br></br></div> 
          {this.state.loading && <><NewsPlaceholder /><NewsPlaceholder /><NewsPlaceholder /><NewsPlaceholder /></>}
          <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<><NewsPlaceholder /><NewsPlaceholder /><NewsPlaceholder /><NewsPlaceholder /></>}
          > 
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
        </>
    )} 
} 