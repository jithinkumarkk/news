import React from 'react';
import 'semantic-ui-css/semantic.min.css'; 
import { Search } from 'semantic-ui-react'
class SearchBar extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { searchNewsTopic: "" };
      }
      handleChange = event => {
        this.setState({ searchNewsTopic: event.target.value });
      };
      handleSubmit = event => {
        event.preventDefault();
        this.props.searchNewsTopic(this.state.searchNewsTopic);
      };
  render() {
    return (
      <div className="search-bar">
            <form onSubmit={this.handleSubmit}>
                {/* <div class="ui category search">
                <div class="ui icon input">
                    <input class="prompt" type="text" placeholder="Search News..."/>
                    <i class="search icon"></i>
                </div>
                <div class="results"></div>
                </div>  */}
             <Search size="small" 
             value={this.state.searchNewsTopic}
             onSearchChange={this.handleChange}
             />
      </form>
      </div>
  );
 }
}
   export default SearchBar; 