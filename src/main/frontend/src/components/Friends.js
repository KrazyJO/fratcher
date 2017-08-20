import React from "react";
import {translate} from "react-i18next";
import User from "./../Util/User";
import Notifications from './../Util/Notifications';
import axios from "axios";
import {Link} from "react-router-dom";

import Events from 'pubsub-js';

//icons
import FaThumbsOUp from "react-icons/lib/fa/wechat";
import FaUser from "react-icons/lib/fa/user";

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
        this.findAncestorDiv = this.findAncestorDiv.bind(this);
    }
    
    findAncestorDiv(el) {
    	if (el.tagName.toLowerCase() === 'div')
    	{
    		return el;
    	}
    	
    	if (el.closest)
    	{
    		//not available in ie...
    		//https://stackoverflow.com/questions/22119673/find-the-closest-ancestor-element-that-has-a-specific-class
    		return el.closest("div[data-user]");
    	}
    	
    	
    	if (el.parentElement)
    	{
    		return this.findAncestorDiv(el.parentElement);
    	}
    	return null;
    }
    
    onChatClicked (oEvent) {
		//find the right data
    	let eContainingDiv = this.findAncestorDiv(oEvent.target);
    	let chatPartnerName = eContainingDiv.dataset.username;
		let chatPartnerId= eContainingDiv.dataset.user;

		//remember it for chat
		this.setChatPartnerOnlineStatusInUser(chatPartnerId);
    	User.setChatPartnerName(chatPartnerName);
    	
    	//nav to the chat...
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
//    	console.log(wsmessage);
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
    		let unreadCount = Notifications.getNotifcationCountForUser(friend.userId);
    		let renderUnreadCount = Boolean(unreadCount && unreadCount > 0); //without boolean it will be 0 (as number), this would be rendered... 
    		return (
    				<div className='list-group-item fratcher-friend' key={friend.userId}>
						<Link to={"/profile/"+friend.userId} className="fratcher-friend-link" ><FaUser size={24} />{friend.userName}</Link>
						<div onClick={this.onChatClicked} data-user={friend.userId} data-userName={friend.userName} className="fratcher-friend-chat">
							<FaThumbsOUp size={24} className={classOnlineStatus}/>
							{ renderUnreadCount &&
								<span>( {unreadCount} )</span>
							}
								
						</div>
					</div>
    		)
    	}));
    }
    
    render () {
    	const {t} = this.props;

    	
    	return (
    			<div className="width500 center list-group"> 
    				{this.renderFriends()}
    			</div>
    	);
    }
}

export default translate()(Friends);