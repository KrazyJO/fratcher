import React from "react";
import {Link} from "react-router-dom";

class Navigator extends React.Component {
//    updateAuthentication() {
//        // If we would store the authentication state in the component's state and reset the state,
//        // we would not have to do this.
//        this.forceUpdate();
//    }
	
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
//        this.handleLogout = this.handleLogout.bind(this);
//        this.cookies = this.props.cookies;
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

    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/matcher">Matcher</Link></li>
                        </ul>
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
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigator;