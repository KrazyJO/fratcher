import React from "react";
import {translate} from "react-i18next";
import User from "./../Util/User";
import axios from "axios";

//react icons
import FaThumbsOUp from "react-icons/lib/fa/thumbs-o-up";
import FaThumbsODown from "react-icons/lib/fa/thumbs-o-down"; 

class Matcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		unmatched : [],
        };
        
        this.onThumbUpClicked = this.onThumbUpClicked.bind(this);
        this.onThumbDownClicked = this.onThumbDownClicked.bind(this);
        this.removeFirstUnmatched = this.removeFirstUnmatched.bind(this);
    }
    
    componentDidMount() {
    	if (User.isNotAuthenticated())
    	{
    		this.props.history.push("/");
    		return;
    	}
    	if (User.isAuthenticated())
    	{
    		axios.get("/api/unmatched")
    		.then(({data, status}) => {
	    		console.log("unmatched: ");
	    		console.log(data);
	    		this.setState({unmatched : data});
	        });
    	}
    }

    onThumbDownClicked() {
    	let profileForAction = this.removeFirstUnmatched();
    	axios.patch("/api/dislike/" + profileForAction.userId)
    	.then(({data, status}) => {
    		if (status === 200)
    		{
    			console.log("disliked " + profileForAction.userName);
    		}
        });
    }
    
    onThumbUpClicked() {
    	let profileForAction = this.removeFirstUnmatched();
    	axios.patch("/api/like/" + profileForAction.userId)
    	.then(({data, status}) => {
    		if (status === 200)
    		{
    			console.log("disliked " + profileForAction.userName);
    		}
        });
    }
    
    removeFirstUnmatched () {
    	let profile = undefined;
    	if (this.state.unmatched.length)
    	{
    		let unmatched = this.state.unmatched;
    		profile = unmatched[0];
    		unmatched = unmatched.slice(1);
    		this.setState({unmatched : unmatched});
    	}
    	
    	return profile;
    }
    
    renderActualUnmatchedUser() {
    	let unmatched = this.state.unmatched[0];
    	if (!unmatched)
    	{
    		return;
    	}
    	return (
    			<div>
    				{unmatched.userName}
    			</div>
    			
    	)
    }   
    
    render () {
    	const {t} = this.props;
    	let component; 
    		
    	if (!this.state.unmatched[0])
    	{
    		component = 
    			<div>
				 Es gibt aktuell keine User mehr für dich! Warte, bis der Bestand gewachsen ist.
				</div>
    	}
    	else
    	{
    		component =
    		<div className="component">
				<div>
					{this.renderActualUnmatchedUser()}
				</div>
				<div className="matcherThumbs">
					<div className="matcherThumbUp">
						<FaThumbsOUp size={50} onClick={this.onThumbUpClicked} />
					</div>
					<div className="matcherThumbDown">
						<FaThumbsODown size={50} onClick={this.onThumbDownClicked}/>
					</div>
				</div>
			</div>
    	}
    	
    	return (
    			component
    	);
    }
}

export default translate()(Matcher);