import React from "react";
import {translate} from "react-i18next";

import axios from "axios";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		userName : "",
        		password : "",
        		passwordRepeat : "",
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleuserNameChange = this.handleuserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordRepeatChange = this.handlePasswordRepeatChange.bind(this);
    }

    handleSubmit() {
    	if (!this.isSubmitActivated())
    	{
    		return;
    	}
    	console.log("handleSubmit register");
    	
    	let userData = {
    		userName : this.state.userName,
    		password : this.state.password 
    	};
    	
    	axios.post("/api/user/create", userData, {
            validateStatus: (status) => {
                return (status >= 200 && status < 300)
            }
        }).then(({data, status}) => {
           if (status === 200)
           {
        	   console.log("user created");
           }
        });
    }
    
    handleuserNameChange(event) {
    	this.setState({userName: event.target.value});
    }
    
    handlePasswordChange(event) {
    	this.setState({password: event.target.value});
		this.forceUpdate();
    }
    
    handlePasswordRepeatChange(event) {
    	this.setState({passwordRepeat: event.target.value});
		this.forceUpdate();
    }
    
    isSubmitActivated () {
    	return this.state.password && this.state.password === this.state.passwordRepeat && this.state.userName;
    }
    
    reset() {
    	this.setState({userName: ""});
    	this.setState({password: ""});
    	this.setState({passwordRepeat: ""});
    }
    
    render () {
    	const {t} = this.props;

    	let btnSubmitClasses = "width500 btn";
    	if (this.isSubmitActivated())
    	{
    		btnSubmitClasses += " btn-success";
    	}
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
					    <button id="btnSendRegister" type="submit" className={btnSubmitClasses} >{t('sendSignIn')}</button>
			    	</form>	
			    </div>
    	);
    }
}

export default translate()(Register);