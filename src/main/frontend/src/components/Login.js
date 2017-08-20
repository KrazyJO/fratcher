import React from "react";
import {translate} from "react-i18next";
import {withCookies} from "react-cookie";

import axios from "axios";
import Events from "pubsub-js";

import User from "./../Util/User";

class Login extends React.Component {
    constructor(props) {
    	super(props);
        this.state = {
            userName: '',
            password: '',
            error: undefined,
            stayOnline : false
        };

        this.handleuserNameChange = this.handleuserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLogoutButtonClicked = this.onLogoutButtonClicked.bind(this);
        this.handleStayOnlineChange = this.handleStayOnlineChange.bind(this);
        this.onButtonCancelClicked = this.onButtonCancelClicked.bind(this); 
        
    }
    
    componentDidMount() {
    	Events.subscribe("loggedInFromRegister", function() {
    		this.forceUpdate();
    	}.bind(this));
    }
    
    onLogoutButtonClicked() {
    	User.reset();
    	Events.publish("loggedIn");
    	this.props.history.push("/");
    	this.props.cookies.remove("auth");
    }
    
    onButtonCancelClicked () {
    	this.props.history.goBack();
    }
    
    handleSubmit(event) {
		event.preventDefault();
		var userData = {
				userName : this.state.userName,
				password : this.state.password
		}
		
		axios.post('/api/user/login', userData, {
            // We allow a status code of 401 (unauthorized). Otherwise it is interpreted as an error and we can't
            // check the HTTP status code.
            validateStatus: (status) => {
                return (status >= 200 && status < 300) || status == 401
            }
        })
            .then(({data, status}) => {
                switch (status) {
                    case 200:
                        this.setState({error: undefined});
                        this.setState({userName : ""});
                        this.setState({password : ""});

                        // Store authentication values even after refresh.
                        let oCookieData = {path: '/'}
                        if (this.state.stayOnline)
                        {
                        	let oDate = new Date();
                        	oDate.setFullYear(oDate.getFullYear()+1);
                        	oCookieData.expires = oDate;
                        }
                        this.props.cookies.set('auth', data, oCookieData);
                        

                        // Send event of updated login state.
                        User.set(data);
                        
                        Events.publish("loggedIn");
                        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                        
                        this.props.history.push("/");
                        break;

                    case 401:
                    	console.log("user login failed");
                    	this.setState({error: true});
                        break;
                }
            });
	}
	
    handleStayOnlineChange (event) {
    	this.setState({stayOnline: event.target.checked});
    }
    
	handleuserNameChange(event) {
		this.setState({userName: event.target.value});
	}
	
	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

    render () {
    	const {t} = this.props;
    	let component = null;
    	let bRenderLoginError = Boolean(this.state.error)
    	if (User.isNotAuthenticated())
    	{
    		component = 
        		<form className="form-horizontal center" onSubmit={this.handleSubmit}>
    			        <div className="form-group">
    			        <input type="text" className="form-control" name="username" placeholder={t('user')} value={this.state.userName}
    			        onChange={this.handleuserNameChange}></input>
    			    </div>
    			    <div className="form-group inputPasswd">
    			        <input type="text" className="form-control" type="password" name="password" placeholder={t('password')} value={this.state.password}
    			        onChange={this.handlePasswordChange}></input>
    			    </div>
    			    <div className="checkbox">
    			    	<label><input type="checkbox" value={this.state.stayOnline} onChange={this.handleStayOnlineChange} />{t('stayOnline')}</label>
    			    </div>
    			    <button type="submit" className="btnRight btn btn-success btnSignIn">{t('signIn')}</button>
    			    <button className="btn btnRight btn-danger" onClick={this.onButtonCancelClicked}>{t('cancel')}</button>
    			</form>
    	}
    	else
    	{
    		component = 
    				<div>
    					<span style={{display : "block", marginBottom: "15px"}}>{t('logoutText')}</span>
    					<button className="btn btnRight btn-success btnSignIn" onClick={this.onButtonCancelClicked}>{t('cancel')}</button>
    					<button className="btn btnRight btn-danger" onClick={this.onLogoutButtonClicked}>{t('logout')}</button>
    				</div>
    			
    	}	
    	
    	
    	return (
    			<div className="center width500">
    				{component}
    				{
        				bRenderLoginError &&
        				<div className="fratcher-login-error">{t('loginError')}</div>
        			}
    			</div>
    	);
    }
}

export default withCookies(translate()(Login));