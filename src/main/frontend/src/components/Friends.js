import React from "react";
import {translate} from "react-i18next";

import axios from "axios";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		friends : []
        };
        
        this.renderFriends = this.renderFriends.bind(this);
    }
    
    componentDidMount() {
    	console.log("friends will mount");
    	axios.get("/api/matches")
    	.then(({data, status}) => {
    		this.setState({friends : data});
        });
    }

    renderFriends () {
    	return this.state.friends.map((friend => {
    		return (
    				<div key={friend.userId}>{friend.firstName}</div>
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