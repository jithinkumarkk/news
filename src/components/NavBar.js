import React, { Component } from 'react'
import { Link } from "react-router-dom"; 
export class NavBar extends Component {

    render() {
        return (
                         <> 
                             <input type="checkbox" id="check"/>
                                <label for="check" class="checkbtn">
                                <i class="fa fa-bars"></i>
                                </label>
                         <ul className="navbar-nav">
                            <li className="nav-item"><Link className="nav-link" aria-current="page" for="check" to="/">Home</Link> </li>
                            <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li> 
                            <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li> 
                        </ul>
                        </>

                    
        )
    }
}

export default NavBar