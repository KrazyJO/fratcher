import React from "react";
import {translate} from "react-i18next";
import User from "./../Util/User";
import axios from 'axios';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		chatHistory : []
        };
        
    }
    
    
    componentDidMount() {
    	this.setState({chatHistory : []});
    	let sChatPartnerId = this.props.match.params.chatPartner;
    	User.id
    	let sUrl = "/api/chat/"+User.id+"/"+sChatPartnerId; 
    	axios.get(sUrl)
    	.then(({data, status}) => {
    		console.log(data);
    		this.setState({chatHistory : data});
        });
    }

//    renderFriends () {
//    	return this.state.friends.map((friend => {
//    		return (
//    				<div key={friend.userId}>
//    					<div>{friend.userName}, {friend.profile.description}
//    						<FaThumbsOUp size={50} data-fratcher-chat-user={friend.userId} onClick={this.onChatClicked}/>
//    					</div>
//					</div>
//    		)
//    	}));
//    }
    
    render () {
    	const {t} = this.props;

    	
    	return (
    			<div className="width500 center">
    				This is the chat component!
    			</div>
    	);
    }
}

export default translate()(Chat);