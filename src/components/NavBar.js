import React, { Component } from 'react'
import { Link } from "react-router-dom"; 
export class NavBar extends Component {
  
      handleChangeCheckBox = event => {
        document.getElementById("check").checked = false;
        document.getElementById("news_search").value ="";
      };
    render() {
        return (
                         <> 
                             <input type="checkbox" id="check" checked={this.checked}/>
                                <label for="check" class="checkbtn">
                                <i class="fa fa-bars"></i>
                                </label> 
                         <ul className="navbar-nav"  style={{flex:5}} >
                            <li  onClick={this.handleChangeCheckBox}  className="nav-item"><Link className="nav-link" aria-current="page" for="check" to="/">Home</Link> </li>
                            <li onClick={this.handleChangeCheckBox}   className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                            <li onClick={this.handleChangeCheckBox}   className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li> 
                            <li onClick={this.handleChangeCheckBox}   className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                            <li onClick={this.handleChangeCheckBox}   className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                            <li onClick={this.handleChangeCheckBox}   className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                            <li onClick={this.handleChangeCheckBox}   className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li> 
                        </ul>
                        </>

                    
        )
    }
}

export default NavBar