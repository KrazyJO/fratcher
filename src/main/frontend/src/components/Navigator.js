import React from "react";
import {Link} from "react-router-dom";
import Events from "pubsub-js";
import axios from 'axios';
import {translate} from "react-i18next";

import User from "./../Util/User";
import UserProfile from './../Util/UserProfile';
import Notifications from './../Util/Notifications';
import Login from "./Login";

import FaUser from "react-icons/lib/fa/user"; 
import FaUserPlus from "react-icons/lib/fa/user-plus";
import FaGroup from "react-icons/lib/fa/group";
import FaHome from "react-icons/lib/fa/home";

class Navigator extends React.Component {
	
	constructor(props) {
        super(props);
        this.state = {
        		notificationCount : Notifications.getTotalCount()
        };
        
        this.onLogoutButtonClicked = this.onLogoutButtonClicked.bind(this);
        this.getNotification = this.getNotifications.bind(this);
    }
	
	componentDidMount() {
    	Events.subscribe("loggedIn", function() {
    		if (User.isAuthenticated())
    		{
    			this.getNotifications();
    		}
    		
    		this.forceUpdate();
    	}.bind(this));
    	
    	Events.subscribe("newNotifications", () => {
    		let count = Notifications.getTotalCount();
    		if (this.state.notificationCount !== count)
    		{
    			this.setState({notificationCount : count});
    		}
    		
    	});
    }

	getNotifications () {
		let userId = User.getId();
		axios.get("/api/chat/notification")
		.then(({data, status}) => {
			Notifications.set(data);
        });
	}
	
	onLogoutButtonClicked() {
		User.reset();
    	Events.publish("loggedIn");
	}
	
	renderLoginArea() {
		const {t} = this.props;
		if (User.isAuthenticated())
		{
			return (
					<div className="navbar-right">
                	<Link className="navbar-text" to={"/profile/"+User.getId()}><FaUser size="20" />{User.getUserName()}</Link>
                	<Link className="btn btn-danger navbar-btn" to="/login">{t('logout')}</Link>
				</div>		
			);
		}
		else
		{
			return (
					<Link className="btn btn-success navbar-right navbar-btn" to="/login">{t('signIn')}</Link>
			);
		}
	}
	
    render() {
    	const {t} = this.props;
    	
    	let notificationBadge = "";
    	if (this.state.notificationCount)
    	{
    		notificationBadge = <span className="badge badgeRed">{this.state.notificationCount}</span>;
    	}
    	
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
	                        {User.isAuthenticated() &&   
	                        	<li><Link to="/"><FaHome size="20" />{t('home')}</Link></li>
	                        }
                            {User.isAuthenticated() &&
                            	<li><Link to="/matcher"><FaUserPlus size="20" />{t('matcher')}</Link></li>
                            }
                            {User.isAuthenticated() && 
                            	<li><Link to="/friends"><FaGroup size="20" />{t('friends')} {notificationBadge}</Link></li>	
                            }
                            
                        </ul>
                        {this.renderLoginArea()}
                        
                        
                    </div>
                </div>
            </nav>
        );
    }
}

export default translate()(Navigator);