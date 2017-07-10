import React from "react";
import {translate} from "react-i18next";

class Login extends React.Component {
    constructor(props) {
    	super(props);
        this.state = {
            email: '',
            password: '',
            error: undefined
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    handleSubmit(event) {
		event.preventDefault();
		console.log("email: " + this.state.email + ", password: " + this.state.password);
	}
	
	handleEmailChange(event) {
		this.setState({email: event.target.value});
	}
	
	handlePasswordChange(event) {
		this.setState({password: event.target.value});
	}

    render () {
    	const {t} = this.props;

    	return (
    			<form className="navbar-form navbar-right" onSubmit={this.handleSubmit}>
	                <div className="form-group">
	                    <input type="text" className="form-control" name="username" placeholder="Username" value={this.state.email}
	                    onChange={this.handleEmailChange}></input>
	                </div>
	                <div className="form-group">
	                    <input type="text" className="form-control" name="password" placeholder="Password" value={this.state.password}
	                    onChange={this.handlePasswordChange}></input>
	                </div>
	                <button type="submit" className="btn btn-success">Sign In</button>
	            </form>
    			
    	);
    }
}

export default translate()(Login);