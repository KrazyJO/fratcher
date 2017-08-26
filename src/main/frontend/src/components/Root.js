import React from "react";

import {Route, Switch} from "react-router-dom";
import {translate} from "react-i18next";
import {Link} from "react-router-dom";

//Notifications
import {NotificationContainer, NotificationManager} from 'react-notifications';

//Events
import Events from 'pubsub-js';

//own component
import Home from './Home';
import Matcher from './Matcher';
import Navigator from './Navigator';
import Register from './Register';
import Profile from './Profile';
import Login from './Login';
import Friends from './Friends';
import Chat from './Chat';

import User from './../Util/User';

class Root extends React.Component {
    constructor(props) {
        super(props);
        // Force initialization of the object.
        
        this.socketMessageReceived = this.socketMessageReceived.bind(this);
    }
    
    componentDidMount() {
    	Events.subscribe("socketMessage", this.socketMessageReceived);
    }
    
    socketMessageReceived(message, data) {
    	let oParsedMessage = false;
    	try{
    		oParsedMessage = JSON.parse(data);
    	}
    	catch (e)
    	{
    		oParsedMessage = false;
    		console.error(data);
    		console.error(e);
    	}
    	if (!oParsedMessage)
    	{
    		return;
    	}
    	const {t} = this.props;
    	if (oParsedMessage.newMatch)
    	{
    		NotificationManager.info(t('newFriend'));
    	}
    	if (oParsedMessage.id && oParsedMessage.message)
    	{
    		if (User.getChatPartnerId() != oParsedMessage.userIdFrom) //do not use typecast here ;)
    		{
    			NotificationManager.info(oParsedMessage.message, t('messageFrom') + oParsedMessage.userNameFrom, 3000, () => {
    				//router is not available here... use good old location.hash
    				User.setChatPartnerId(oParsedMessage.userIdFrom);
    				User.setChatPartnerName(oParsedMessage.userNameFrom);
    				location.hash = '#/chat/'+oParsedMessage.userIdFrom;
    			});
    		}
    	}
    }

    render() {
        return (
            <div>
	            <Navigator  />
                <Switch>
                    <Route path="/matcher" component={Matcher}/>

                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register}/>
                    <Route path="/profile/:profileId" component={Profile}/>
                    <Route path="/friends" component={Friends} />
                    <Route path="/chat/:chatPartner" component={Chat} />
                    {/*Default route*/}
                    <Route path="/" component={Home}/>
                </Switch>
                <NotificationContainer/>
            </div>
        );
    }
}

export default translate()(Root);