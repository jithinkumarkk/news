import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Search } from 'semantic-ui-react';
const SearchBar = () => ( 
            <form>
        <div class="ui category search">
                <div class="ui icon input">
                    <input class="prompt" type="text" placeholder="Search News..."/>
                    <i class="search icon"></i>
                </div>
                <div class="results"></div>
                </div>
      </form>
   )
   export default SearchBar; 