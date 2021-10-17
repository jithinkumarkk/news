import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return ( 
            <div className="news-card">
            <div className="meta">
               <div className="photo" >
                   <img src={imageUrl} alt={title}/></div>
               <ul className="details">
                  <li className="author"><a href="#">{author}</a></li>
                  <li className="date">{date}</li>
               </ul>
            </div>
            <div className="description">
               <small className="author"> {author}</small>
               <h1>{title}</h1>
               <p>  {description}</p>
               <p className="read-more">  <a href={newsUrl} target="_blank">Read More</a></p>
            </div>
         </div>

            
        )
    }
}

export default NewsItem