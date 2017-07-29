import React from "react";
import {translate} from "react-i18next";


//icons

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        
    }
    
    
    componentDidMount() {
    	console.log("chat will mount");
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