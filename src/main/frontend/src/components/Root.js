import {translate} from "react-i18next";

//Notifications
import {NotificationContainer, NotificationManager} from 'react-notifications';

//Events
import Events from 'pubsub-js';

import {Link} from "react-router-dom";
import {CookiesProvider} from 'react-cookie';
//own component
import Home from './components/Home';
import Matcher from './components/Matcher';
import Navigator from './components/Navigator';
import Register from './components/Register';
import Profile from './components/Profile';
import Login from './components/Login';
import Friends from './components/Friends';
import Chat from './components/Chat';

import User from './Util/User';

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
    	if (oParsedMessage.newMatch)
    	{
    		NotificationManager.info("Du hast einen neuen Freund gefunden");
    	}
    	if (oParsedMessage.id && oParsedMessage.message)
    	{
    		if (User.getChatPartnerId() != oParsedMessage.userIdFrom) //do not use typecast here ;)
    		{
    			NotificationManager.info(oParsedMessage.message, "Nachricht von " + oParsedMessage.userNameFrom, 3000, () => {
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