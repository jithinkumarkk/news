import React, { Component } from 'react';  
import PropTypes from 'prop-types'; 
import { News_Api_Key } from './ApiKey'; 
import NewsPlaceholder from './PlaceHolder';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem";
export default class InfiniteNews extends React.Component  {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
    query: '',
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    query: PropTypes.string
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
    
    if(this.props.query){ 
      url =   `https://newsapi.org/v2/everything?q=${this.props.query}&sortBy=publishedAt&apiKey=${News_Api_Key}`; 
    }
    else
    {
       url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${News_Api_Key}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
     }
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
  
  fetchMoreData = async () => {  
    this.setState({page: this.state.page + 1})
    let url="";
    
    if(this.props.query){ 
      url =   `https://newsapi.org/v2/everything?q=${this.props.query}&sortBy=publishedAt&apiKey=${News_Api_Key}`; 
    }
    else{
     url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${News_Api_Key}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    }
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
         <h2 className="tag-line">{this.capitalizeFirstLetter(this.props.category)}</h2>
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
                      return <div className="col-md-4" key={element.url}>
                          <NewsItem
                          title={element.title ? element.title : ""} 
                          description={element.description ? element.description : ""} 
                          imageUrl={element.urlToImage} 
                          newsUrl={element.url} 
                          author={element.author}
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