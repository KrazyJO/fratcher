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
    			<div className="center width500 main-login main-center">
	    			<form className="form-horizontal" onSubmit={this.handleSubmit}>
				        <div className="form-group">
					        <input className="form-control" type="text" placeholder={t('user')} value={this.state.userName}
					        	onChange={this.handleuserNameChange}></input>
					    </div>
					    <div className="form-group">
					        <input className="form-control" type="text" type="password" placeholder={t('password')} value={this.state.password}
					        	onChange={this.handlePasswordChange}></input>
					    </div>
					    <div className="form-group">
						    <input className="form-control" type="text" type="password" placeholder={t('passwordRepeat')} value={this.state.passwordRepeat}
					        	onChange={this.handlePasswordRepeatChange}></input>
					    </div>
					    <button type="submit" className="width500 btn btn-success">{t('sendSignIn')}</button>
			    	</form>	
			    </div>
    	);
    }
}

export default translate()(Register);