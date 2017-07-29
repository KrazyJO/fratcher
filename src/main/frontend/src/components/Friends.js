import React from "react";
import {translate} from "react-i18next";
import User from "./../Util/User";
import axios from "axios";

import Events from 'pubsub-js';

//icons
import FaThumbsOUp from "react-icons/lib/fa/wechat";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		friends : []
        };
        
        this.renderFriends = this.renderFriends.bind(this);
        this.onChatClicked = this.onChatClicked.bind(this);
        this.onSocketMessageReceived = this.onSocketMessageReceived.bind(this);
    }
    
    onChatClicked (oEvent) {
    	console.log("onChatClicked");
    	let chatPartnerId = oEvent.target.parentElement.parentElement.dataset.user;
    	if (!chatPartnerId)
    	{
    		chatPartnerId = oEvent.target.dataset.user;
    	}
    	this.props.history.push("/chat/"+chatPartnerId);
    }
    
    componentDidMount() {
    	if (User.isNotAuthenticated())
    	{
    		this.props.history.push("/");
    		return;
    	}
    	
    	Events.subscribe("socketMessage", this.onSocketMessageReceived);
    	
    	axios.get("/api/matches")
    	.then(({data, status}) => {
    		this.setState({friends : data});
        });
    }
    
    componentWillUnmount () {
    	Events.unsubscribe("socketMessage", this.onSocketMessageReceived);
    }

    /**
     * set online status if user with this id is in chat history
     */
    onSocketMessageReceived (message, data) {
    	let wsmessage = JSON.parse(data);
    	console.log(wsmessage);
    	if (wsmessage && wsmessage.online)
    	{
    		let userId = wsmessage.online;
    		let bForceUpdate = false;
    		this.state.friends.forEach((user) => {
    			if (user.userId == userId)
    			{
    				user.online = true;
    				bForceUpdate = true;
    			}
    		});
    		if (bForceUpdate)
    		{
    			this.forceUpdate();
    		}
    		
    	}
    	if (wsmessage && wsmessage.offline)
    	{
    		let userId = wsmessage.offline;
    		let bForceUpdate = false;
    		this.state.friends.forEach((user) => {
    			if (user.userId == userId)
    			{
    				user.online = false;
    				bForceUpdate = true;
    			}
    		});
    		if (bForceUpdate)
    		{
    			this.forceUpdate();
    		}
    	}
    } 
    
    renderFriends () {
    	return this.state.friends.map((friend => {
    		let classOnlineStatus = friend.online ? 'isOnline' : 'isOffline';
    		return (
    				<div key={friend.userId}>
    					<div>{friend.userName}, {friend.profile.description}
    						<FaThumbsOUp size={24} data-user={friend.userId} className={classOnlineStatus} onClick={this.onChatClicked}/>
    					</div>
					</div>
    		)
    	}));
    }
    
    render () {
    	const {t} = this.props;

    	
    	return (
    			<div className="width500 center">
    				{this.renderFriends()}
    			</div>
    	);
    }
}

export default translate()(Friends);