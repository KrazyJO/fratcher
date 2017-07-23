import React from "react";
import {translate} from "react-i18next";
import User from "./../Util/User";
import axios from "axios";

//react icons
import FaThumbsOUp from "react-icons/lib/fa/thumbs-o-up"; 
//var FaThumbsUp = require('react-icons/lib/fa/thumbs-o-up');
//var oThumg = React.createClass({
//    render: function() {
//        return React.createElement('h3', null,
//            ' Lets go for a ', React.createElement(FaThumbsUp, null), '? '
//        );
//    }
//});

class Matcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		unmatched : [],
        		actual : 0
        };

    }
    
    componentDidMount() {
    	console.log("matcher component did mount");
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

    renderActualUnmatchedUser() {
    	let unmatched = this.state.unmatched[this.state.actual];
    	if (!unmatched)
    	{
    		return;
    	}
    	return (
    			<div>
    				{unmatched.description}
    			</div>
    	)
    }   
    
    render () {
    	const {t} = this.props;

    	return (
    			<div className="component">{t('matcherComp')}
    				<div>
    					{this.renderActualUnmatchedUser()}
    				</div>
    				<div>
    				<FaThumbsOUp />
    				</div>
    			</div>
    	);
    }
}

export default translate()(Matcher);