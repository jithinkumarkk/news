import React from "react"; 
import NewsItem from "./NewsItem";
import NewsPlaceholder from "./PlaceHolder";

 

const SearchItemList = props => {
  return (
    // <List divided style={{ maxWidth: 900, margin: "0 auto" }}>
    //   {props.articles.map((article, index) => (
        
    //   ))}
    // </List>
        <> 
        <h2 className="tag-line">Total Results : { props.articles.length }</h2> 
        <div className="container">
        <div className="row">
                  {props.articles.map((element) => {
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
        </>
  );
};

export default SearchItemList;