import React from "react";
import {translate} from "react-i18next";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleuserNameChange = this.handleuserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordRepeatChange = this.handlePasswordRepeatChange.bind(this);
    }

    handleSubmit() {
    	console.log("handleSubmit register");
    }
    
    handleuserNameChange(event) {
    	
    }
    
    handlePasswordChange(event) {
    	
    }
    
    handlePasswordRepeatChange(event) {
    	
    }
    
    render () {
    	const {t} = this.props;

    	return (
    			<div>
	    			<div className="component">{t('registerComp')}</div>
	    			<form onSubmit={this.handleSubmit}>
				        <div>
					        <input type="text" placeholder={t('user')} value={this.state.userName}
					        onChange={this.handleuserNameChange}></input>
					    </div>
					    <div>
					        <input type="text" type="password" placeholder={t('password')} value={this.state.password}
					        onChange={this.handlePasswordChange}></input>
					        <input type="text" type="password" placeholder={t('passwordRepeat')} value={this.state.passwordRepeat}
					        onChange={this.handlePasswordRepeatChange}></input>
					    </div>
					    <button type="submit">{t('sendSignIn')}</button>
			    	</form>	
			    </div>
    	);
    }
}

export default translate()(Register);