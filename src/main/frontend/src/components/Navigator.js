import React from "react";
import {Link} from "react-router-dom";
import Events from "pubsub-js";

import User from "./../Util/User";
import Login from "./Login";

class Navigator extends React.Component {
//    updateAuthentication() {
//        // If we would store the authentication state in the component's state and reset the state,
//        // we would not have to do this.
//        this.forceUpdate();
//    }
	
	constructor(props) {
        super(props);
        this.state = {};
        
        this.onLogoutButtonClicked = this.onLogoutButtonClicked.bind(this);
    }
	
	
	
	componentDidMount() {
    	Events.subscribe("loggedIn", function() {
    		this.forceUpdate();
    	}.bind(this));
    }
	
	onLogoutButtonClicked() {
		User.reset();
    	Events.publish("loggedIn");
	}
	
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/matcher">Matcher</Link></li>
                            {User.isAuthenticated() && 
                            	<li><Link to="/profile">Profil</Link></li>	
                            }
                            {User.isAuthenticated() && 
                            	<li><Link to="/friends">Friends</Link></li>	
                            }
                            
                        </ul>
                        {
                        	User.isNotAuthenticated() &&
                        	<Link className="btn btn-success navbar-right navbar-btn" to="/login">Anmelden</Link>
                        }
                        {
                        	User.isAuthenticated() &&
                        	<div className="navbar-right">
	                        	<span className="navbar-text">{User.getUserName()}</span>
	                        	<Link className="btn btn-danger navbar-btn" to="/login">Abmelden</Link>
        					</div>
                        }
                        
                        
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigator;