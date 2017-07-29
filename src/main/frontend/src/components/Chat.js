import React from "react";
import {translate} from "react-i18next";
import User from "./../Util/User";
import axios from 'axios';

import Events from "pubsub-js";

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		chatHistory : [],
        		submitMessage : ""
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
    	let sUrl = "/api/chat/"+User.id+"/"+sChatPartnerId; 
    	axios.get(sUrl)
    	.then(({data, status}) => {
    		console.log(data);
    		this.setState({chatHistory : data});
        });
    }
    
    onSocketMessageReceived (message, data) {
    	let wsmessage = JSON.parse(data);
    	console.log(wsmessage);
    	if (wsmessage && wsmessage.id && wsmessage.message)
    	{
    		//this is surely a message object
    		this.state.chatHistory.push(wsmessage);
    		this.forceUpdate();
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
    	axios.post("/api/chatmessage", oMessage)
    	.then(({data, status}) => {
    		this.state.chatHistory.push(data);
    		this.forceUpdate();
    	});
    }
    
    convertToLocaleString(iValue) {
    	return new Date(iValue).toLocaleString();
    }
    
    renderMessages () {
    	return this.state.chatHistory.map((message => {
    		return (
    				<div key={message.id}>
    					<div>{message.userIdFrom}, {this.convertToLocaleString(message.createdAt)}: {message.message}</div>
					</div>
    		)
    	}));
    }
    
    render () {
    	const {t} = this.props;

    	
    	return (
    			<div className="width500 center">
    				This is the chat component!
    				{this.renderMessages()}
    				<div>
    					<form onSubmit={this.submitMessage}>
    						<input type="text" name="message" value={this.state.submitMessage} onChange={this.onSubmitMessageChange}></input>
    						<button type="submit">Abschicken</button>
    					</form>
    				</div>
    			</div>
    	);
    }
}

export default translate()(Chat);