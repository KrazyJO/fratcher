import React from "react";
import {translate} from "react-i18next";
import User from "./../Util/User";
import Notifications from './../Util/Notifications';
import axios from 'axios';

import Events from "pubsub-js";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		chatHistory : [],
        		submitMessage : "",
        		partnerIsOnline : false,
        		submitted : false
        };
        
        this.submitMessage = this.submitMessage.bind(this);
        this.onSubmitMessageChange = this.onSubmitMessageChange.bind(this);
        this.onSocketMessageReceived = this.onSocketMessageReceived.bind(this);
    }
    
    componentWillUnmount () {
    	console.log("leaving chat");
    	Events.unsubscribe("socketMessage", this.onSocketMessageReceived);
    }
    
    componentDidMount() {
    	if (User.isNotAuthenticated())
    	{
    		this.props.history.push("/");
    		return;
    	}
    	
    	Events.subscribe("socketMessage", this.onSocketMessageReceived);
    	
    	this.setState({chatHistory : [], submitMessage : ""});
    	let sChatPartnerId = this.props.match.params.chatPartner;
    	User.id
    	let sUrl = "/api/chat/"+sChatPartnerId; 
    	axios.get(sUrl)
    	.then(({data, status}) => {
    		console.log(data);
    		this.setState({chatHistory : data});
    		this.setState({submitted : true});
        });
    	
    	this.state.partnerIsOnline = User.getChatPartnerOnlineStatus();
    	Notifications.setMessagesRead(User.getChatPartnerName(), sChatPartnerId);
    }
    
    /**
     * for new messages scroll down.
     */
    componentDidUpdate() {
    	if (this.state.submitted) {
    		let eChat = document.getElementById("chat");
    		eChat.scrollTop = eChat.scrollHeight;
    		this.setState({submitted:false});
    	}
    }
    
    onSocketMessageReceived (message, data) {
    	let wsmessage = JSON.parse(data);
    	console.log(wsmessage);
    	if (wsmessage && wsmessage.id && wsmessage.message)
    	{
    		//this is surely a message object
    		if (wsmessage.userIdFrom == this.props.match.params.chatPartner)
    		{ 
    			//this is my chat partner
    			this.state.chatHistory.push(wsmessage);
        		this.setState({submitted : true});
    		}
    	}
    	if (wsmessage && wsmessage.online)
    	{
    		let userId = wsmessage.online;
    		if (userId == this.props.match.params.chatPartner)
    		{
    			this.setState({partnerIsOnline: true});
    		}
    	}
    	if (wsmessage && wsmessage.offline)
    	{
    		let userId = wsmessage.offline;
    		if (userId == this.props.match.params.chatPartner)
    		{
    			this.setState({partnerIsOnline: false});
    		}
    	}
    } 
    
    onSubmitMessageChange(oEvent) {
    	this.setState({submitMessage: oEvent.target.value});
    }
    
    submitMessage (oEvent) {
    	oEvent.preventDefault();
    	let message = this.state.submitMessage;
    	let oMessage = {
    		message : message,
    		read : false,
    		userIdFrom : User.id,
    		userIdTo : this.props.match.params.chatPartner
    	};
    	//delete message in form input
    	this.setState({submitMessage : ""});
    	axios.post("/api/chatmessage", oMessage)
    	.then(({data, status}) => {
    		this.state.chatHistory.push(data);
//    		this.forceUpdate();
    		this.setState({submitted : true});
    	});
    	Notifications.setMessagesRead(User.getChatPartnerName(), this.props.match.params.chatPartner);
    }
    
    convertToLocaleString(iValue) {
    	return new Date(iValue).toLocaleString();
    }
    
    renderMessages () {
    	return this.state.chatHistory.map((message => {
    		let bMe = message.userIdFrom === User.getId();
    		let sClassName = bMe ? 'message messageRight' : 'message messageLeft';
    		let userName = bMe ? 'Ich' : User.getChatPartnerName();
    		return (
    				<div key={message.id} className={sClassName} >
    					<div className="messageTime">{userName} ● {this.convertToLocaleString(message.createdAt)}</div>
    					<div className="messageText">{message.message}</div>
					</div>
    		)
    	}));
    }
    
    render () {
    	const {t} = this.props;
    	let sOnlineClass = 'onlineStatus';
    	if (this.state.partnerIsOnline)
    	{
    		sOnlineClass += " isOnline";
    	}
    	
    	
    	return (
    			<div className="center chat">
    				<div className="chatPartnerName">
    					<div className={sOnlineClass} />
    					<div className="chatPartnerNameText">{User.getChatPartnerName()}</div>
    				</div>
    				<div id="chat" className="chatMessages">
    					{this.renderMessages()}
    				</div>
    				<div className="chatSend">
    					<form className="form-horizontal center chatSubmitContainer" onSubmit={this.submitMessage}>
    						<input className="form-control" type="text" name="message" value={this.state.submitMessage} onChange={this.onSubmitMessageChange}></input>
    						<button className="btnRight btn btn-success btnSignIn" type="submit">Abschicken</button>
    					</form>
    				</div>
    			</div>
    	);
    }
}

export default translate()(Chat);