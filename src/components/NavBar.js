import React, { Component } from 'react'
import { Link } from "react-router-dom"; 
export class NavBar extends Component {
      
    constructor(props) {
        super(props);
        };
    
      
      handleClick = event => {
       // this.setState({menuOpen: "navbar-nav"});
        this.props.parentMethod();
      };
      
      
    render() {
        return (
                         <>  
                         <ul className={this.props.open}  id="menus"  style={{flex:5}} >
                             <li className="mobileshow">
                                 
                             <p class="block-title"> <span><br></br><br></br></span><div class="block-subtitle">Sections</div></p>
                             </li>
                            <li  onClick={this.handleClick}  className="nav-item"><Link className="nav-link" aria-current="page" for="check" to="/">Home</Link> </li>
                            <li onClick={this.handleClick}   className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                            <li onClick={this.handleClick}   className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li> 
                            <li onClick={this.handleClick}   className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                            <li onClick={this.handleClick}   className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                            <li onClick={this.handleClick}   className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                            <li onClick={this.handleClick}   className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li> 
                        </ul>
                        </>

                    
        )
    }
}

export default NavBar