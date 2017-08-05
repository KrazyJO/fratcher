import React from "react";
import {translate} from "react-i18next";
import {Link} from 'react-router-dom';
import Events from 'pubsub-js';

import User from "./../Util/User";
import UserProfile from './../Util/UserProfile';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        
        this.onRegisterClicked = this.onRegisterClicked.bind(this);
    }

    onRegisterClicked() {
    	this.props.history.push("/register");
    }
    
    isInRegistration() {
    	return User.isAuthenticated() && !UserProfile.isValidForSubmit();
    }
    
    componentWillUnmount () {
    	if (this.subscription)
    	{
    		Events.unsubscribe(this.subscription);	
    	}
    	
    }
    
    componentDidMount() {
    	this.subscription = Events.subscribe("loggedIn", ()=>{
    		this.forceUpdate();
    	});
    }
    
    render () {
    	const {t} = this.props;

    	return (
    			<div>

            		<img style={{display: "block"}} className="center" src="./../resources/fratcher-logo.png" />
    				{
    					this.isInRegistration() && 
    					<span>Bevor Sie loslegen können, müssen Sie Ihr <Link to="/profile">Profil</Link> einrichten.</span>
    				}
    				{
    					User.isNotAuthenticated() &&
    					<div>
	    					<span className="teaser">{t('teaser')}</span>
	        				<button type="submit" onClick={this.onRegisterClicked} className="btn btn-success btnSignUp">{t('signUp')}</button>
    					</div>
    				}
    				{
    					User.isAuthenticated() && UserProfile.isValidForSubmit() &&
    					<span>leg los und finde neue Freunde...</span>
    				}
    				
    			</div>
    			
    	);
    }
}

export default translate()(Home);