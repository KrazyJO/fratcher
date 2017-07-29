import React from "react";
import {translate} from "react-i18next";

import axios from "axios";
import Events from "pubsub-js";

import User from "./../Util/User";

class Login extends React.Component {
    constructor(props) {
    	super(props);
        this.state = {
            userName: '',
            password: '',
            error: undefined
        };

        this.handleuserNameChange = this.handleuserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLogoutButtonClicked = this.onLogoutButtonClicked.bind(this);
        this.openWebSocket = this.openWebSocket.bind(this);
        
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
//    	this.forceUpdate();
    }
    
    openWebSocket() {
    	var oSocket = new WebSocket("ws://localhost:8080/api/chat");
    	User.setWebSocketConnection(oSocket);
    	
    	oSocket.onopen = function() {
    		console.log("websocket is now open");
    	};
    	
    	oSocket.onmessage = function(oEvent) {
    		console.log("websocket received message: " + oEvent.data);
    	}
    	
    	oSocket.onerror = function(oEvent) {
    		console.log("websocket has an error...");
    	}
    	
    	oSocket.onclose = function() {
    		console.log("websocket is closed now");
    	}
    }
    
    handleSubmit(event) {
		event.preventDefault();
		console.log("userName: " + this.state.userName + ", password: " + this.state.password);
		
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
//                        User.setCookieCredentials(data);
                        this.setState({error: undefined});
                        this.setState({userName : ""});
                        this.setState({password : ""});

                        // Store authentication values even after refresh.
//                        this.cookies.set('auth', {
//                            token: data.token,
//                            user: User
//                        }, {path: '/'});

                        // Send event of updated login state.
                        User.set(data);
                        
                        Events.publish("loggedIn");
                        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                        
                        this.openWebSocket(); 
                        
                        this.props.history.push("/");
                        break;

                    case 401:
//                        this.setState({error: true});
                    	console.log("user login failed");
                        break;
                }
            });
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
    			    <button type="submit" className="btnRight btn btn-success btnSignIn">{t('signIn')}</button>
    			</form>	
    	}
    	else
    	{
    		component = 
    				<div>
    					<span className="navbar-text">{User.getUserName()}</span>
    					<button className="btn btn-danger" onClick={this.onLogoutButtonClicked}>logout</button>
    				</div>
    			
    	}	
    	
    	
    	return (
    			<div className="center width500">
    				{component}
    			</div>
    	);
    }
}

export default translate()(Login);