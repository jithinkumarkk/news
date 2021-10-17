import React from 'react';
import { Search } from 'semantic-ui-react' ;
import {  Form } from "semantic-ui-react";
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchTopic: "" };
  }
  handleChange = event => {
    this.setState({ searchTopic: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ searchTopic: event.target.value });
    this.props.searchForTopic(this.state.searchTopic);
    // this.setState({ searchTopic: event.target.value });
    
  };
  _handleKeyDown= event =>{
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setState({ searchTopic: event.target.value });
      this.props.searchForTopic(this.state.searchTopic);
    }
  }
  render() {
    return ( 
        <Form onSubmit={this.handleSubmit}   style={{ margin:15 }}>
          <Form.Group>
            {/* <Form.Input
              placeholder="Search topic"
              name="topic"
             id="news_search"  
              value={this.state.searchTopic}
              onChange={this.handleChange}
            /> */}

            <div class="ui icon input">
              <input type="text" placeholder="Search News..." id="news_search"  
              value={this.state.searchTopic}
              onKeyDown={this._handleKeyDown}
              onChange={this.handleChange}/>
              <i class="search icon"></i>
            </div>
           </Form.Group>
        </Form> 
       // <Search placeholder="Search topic"  value={this.state.searchTopic} onSearchChange={this.handleSubmit}  />
    );
  }
}
   export default SearchBar; 