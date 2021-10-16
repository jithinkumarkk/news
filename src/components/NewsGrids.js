import React from "react";
import './grids.css' ;  
import dummy_img from './dummy.png';
 class NewsGrids extends React.Component {  
  render() { 
    return (  
     <div class="news-grid-container">
        {this.props.data.slice(0, 5).map( (item,index) => 
         <div className={"news-grid"+ index +" image-container"}>  
           <img src={item.urlToImage} />
           <div className="info"><p>{item.source.name}</p><h1>{item.title}</h1>
           <p></p>
          </div>
       </div> 
      )  
      }
      </div> 
        
    );
   }
}

export default NewsGrids;
 