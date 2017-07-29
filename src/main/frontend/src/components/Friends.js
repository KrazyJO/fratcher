import React from "react";
import {translate} from "react-i18next";
import User from "./../Util/User";
import axios from "axios";

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
    	axios.get("/api/matches")
    	.then(({data, status}) => {
    		this.setState({friends : data});
        });
    }

    renderFriends () {
    	return this.state.friends.map((friend => {
    		return (
    				<div key={friend.userId}>
    					<div>{friend.userName}, {friend.profile.description}
    						<FaThumbsOUp size={50} data-user={friend.userId} onClick={this.onChatClicked}/>
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