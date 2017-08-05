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
	    		this.setState({unmatched : data});
	        });
    	}
    }

    onThumbDownClicked() {
    	let profileForAction = this.removeFirstUnmatched();
    	axios.patch("/api/dislike/" + profileForAction.userId);
//    	.then(({data, status}) => {
//    		if (status === 200)
//    		{
//    			console.log("disliked " + profileForAction.userName);
//    		}
//        });
    }
    
    onThumbUpClicked() {
    	let profileForAction = this.removeFirstUnmatched();
    	axios.patch("/api/like/" + profileForAction.userId);
//    	.then(({data, status}) => {
//    		if (status === 200)
//    		{
//    			console.log("disliked " + profileForAction.userName);
//    		}
//        });
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
    	const {t} = this.props;
    	return (
    			<div>
    				<div style={{textAlign: "center", fontSize: "16px"}}>{unmatched.userName}{t('userSays')}</div>
    				<div>
    					<pre style={{marginTop: "5px", textAlign: "center", minHeight: "150px", fontSize: "16px"}}>
    						{unmatched.profile.description}
    					</pre>
    				</div>
    			</div>
    			
    	)
    }   
    
    render () {
    	const {t} = this.props;
    	let component; 
    		
    	if (!this.state.unmatched[0])
    	{
    		component = 
    			<div>{t('noMatchesPossible')}</div>
    	}
    	else
    	{
    		component =
    		<div className="component width500 center">
				<div>
					{this.renderActualUnmatchedUser()}
				</div>
				<div style={{marginTop: "25px"}} className="matcherThumbs">
					<div style={{display: "block", marginBottom: "25px", fontWeight: "bold", fontSize: "17px"}}>
						{t('yourAnswer')}
					</div>
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