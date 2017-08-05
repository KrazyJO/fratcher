import React from "react";
import {Link} from "react-router-dom";
import Events from "pubsub-js";
import axios from 'axios';

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
        this.getNotification = this.getNotifications.bind(this);
    }
	
	componentDidMount() {
    	Events.subscribe("loggedIn", function() {
    		this.getNotifications();
    		this.forceUpdate();
    	}.bind(this));
    }

	getNotifications () {
		let userId = User.getId();
		axios.get("/api/chat/notification/"+userId)
		.then(({data, status}) => {
			console.log("notification:");
			console.log(data);

        });
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
                            {User.isAuthenticated() && 
                            	<li><Link to="/matcher">Matcher</Link></li>
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
	                        	<Link className="navbar-text" to="/profile">{User.getUserName()}</Link>
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