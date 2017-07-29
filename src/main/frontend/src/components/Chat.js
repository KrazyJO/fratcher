import React from "react";
import {translate} from "react-i18next";
import User from "./../Util/User";
import axios from 'axios';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		chatHistory : [],
        		submitMessage : ""
        };
        
        this.submitMessage = this.submitMessage.bind(this);
        this.onSubmitMessageChange = this.onSubmitMessageChange.bind(this);
    }
    
    componentWillUnmount () {
    	console.log("leaving chat");
    }
    
    componentDidMount() {
    	if (User.isNotAuthenticated())
    	{
    		this.props.history.push("/");
    		return;
    	}
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

    onSubmitMessageChange(oEvent) {
    	this.setState({submitMessage: oEvent.target.value});
    }
    
    submitMessage (oEvent) {
    	oEvent.preventDefault();
    	let message = this.state.submitMessage;
    	console.log("submit message :): " + message);
    }
    
    renderMessages () {
    	return this.state.chatHistory.map((message => {
    		return (
    				<div key={message.id}>
    					<div>{message.userIdFrom}, {message.message}</div>
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