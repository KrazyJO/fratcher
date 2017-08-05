import React from "react";
import {translate} from "react-i18next";
import User from "./../Util/User";
import Notifications from './../Util/Notifications';
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
        this.setOnlineStatus = this.setOnlineStatus.bind(this);
        this.setChatPartnerOnlineStatusInUser = this.setChatPartnerOnlineStatusInUser.bind(this);
        this.onNewNotifications = this.onNewNotifications.bind(this);
    }
    
    onChatClicked (oEvent) {
    	console.log("onChatClicked");
    	let chatPartnerId = null;
    	try
    	{
    		chatPartnerId = oEvent.target.parentElement.parentElement.dataset.user;
    	}
    	catch (e)
    	{
    		chatPartnerId = oEvent.target.dataset.user;
    	}
    	let chatPartnerName = null;
    	try
    	{
    		chatPartnerName = oEvent.target.parentElement.parentElement.dataset.userName;
    	}
    	catch(e)
    	{
    		chatPartnerName = oEvent.target.dataset.userName;
    	}
    	this.setChatPartnerOnlineStatusInUser(chatPartnerId);
    	User.setChatPartnerName(chatPartnerName);
    	this.props.history.push("/chat/"+chatPartnerId);
    }
    
    setChatPartnerOnlineStatusInUser (partnerId) {
    	let bIsOnline = false; 
    	this.state.friends.forEach((friend) => {
    		if (friend.userId == partnerId)
    		{
    			bIsOnline = friend.online;
    			return false; //break
    		}
    	});
    	User.setChatPartnerOnlineStatus(bIsOnline);
    }
    
    componentDidMount() {
    	if (User.isNotAuthenticated())
    	{
    		this.props.history.push("/");
    		return;
    	}
    	
    	this.subscription = Events.subscribe("socketMessage", this.onSocketMessageReceived);
    	
    	this.notificationSubscription = Events.subscribe("newNotifications", () => {
        	this.forceUpdate();
        });
    	
    	axios.get("/api/matches")
    	.then(({data, status}) => {
    		this.setState({friends : data});
        });
    }
    
    componentWillUnmount () {
    	if (this.subscription) {
    		Events.unsubscribe(this.subscription);
    	}
    	if (this.notificationSubscription) {
    		Events.unsubscribe(this.notificationSubscription);
    	}
    		
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
    		this.setOnlineStatus(userId, true);
    	}
    	if (wsmessage && wsmessage.offline)
    	{
    		let userId = wsmessage.offline;
    		this.setOnlineStatus(userId, false);
    	}
    } 
    
    setOnlineStatus(userId, bOnline) {
    	let bForceUpdate = false;
		this.state.friends.forEach((user) => {
			if (user.userId == userId)
			{
				user.online = bOnline;
				bForceUpdate = true;
			}
		});
		if (bForceUpdate)
		{
			this.forceUpdate();
		}
    }
    
    onNewNotifications() {
    	this.forceUpdate();
    }
    
    renderFriends () {
    	return this.state.friends.map((friend => {
    		let classOnlineStatus = 'chatIcon ';
    		classOnlineStatus += friend.online ? 'isOnline' : 'isOffline';
    		let unreadCount = Notifications.getNotifcationCountForUser(friend.userName);
    		return (
    				<div key={friend.userId}>
    					<div>{friend.userName}, {friend.profile.description}, {unreadCount}
    						<FaThumbsOUp size={24} data-user={friend.userId} data-userName={friend.userName} className={classOnlineStatus} onClick={this.onChatClicked}/>
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