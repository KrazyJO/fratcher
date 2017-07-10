import React from "react";
import {translate} from "react-i18next";

class LoggedOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        
        this.onRegisterClicked = this.onRegisterClicked.bind(this);
    }

    onRegisterClicked() {
    	console.log("onRegisterClicked");
    	this.props.history.push("/register");
    }
    
    render () {
    	const {t} = this.props;

    	return (
    			<div>
    				<span className="teaser">{t('teaser')}</span>
    				<button type="submit" onClick={this.onRegisterClicked} className="btn btn-success btnSignUp">{t('signUp')}</button>
    			</div>
    			
    	);
    }
}

export default translate()(LoggedOut);