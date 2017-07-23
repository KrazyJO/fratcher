import React from "react";
import {translate} from "react-i18next";

import axios from "axios";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    componentDidMount() {
    	console.log("friends will mount");
    	axios.get("/api/matches")
    	.then(({data, status}) => {
    		console.log("matches: ");
    		console.log(data);
        });
    }
    
    render () {
    	const {t} = this.props;

    	
    	return (
    			<div className="width500 center">
    				Friends
    			</div>
    	);
    }
}

export default translate()(Friends);