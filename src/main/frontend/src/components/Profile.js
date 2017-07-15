import React from "react";
import {translate} from "react-i18next";

import axios from "axios";
import User from "./../Util/User";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
    }
    
    
    render () {
    	const {t} = this.props;

    	
    	return (
    			<div>{t('profile')}</div>
    	);
    }
}

export default translate()(Profile);