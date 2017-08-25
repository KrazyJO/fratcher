import React from "react";
import {translate} from "react-i18next";
import {withCookies} from "react-cookie";
import axios from "axios";
import User from "./../Util/User";
import Events from "pubsub-js";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		userName : "",
        		password : "",
        		passwordRepeat : "",
        		error : undefined,
        		firstName : "",
        		lastName : "",
        		yearOfBirth : "",
        		description : "",
        		hobbies : "",
        		gender : "Uncertain"
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleuserNameChange = this.handleuserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordRepeatChange = this.handlePasswordRepeatChange.bind(this);
        this.onButtonCancelClicked = this.onButtonCancelClicked.bind(this);
        
        //profile
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleOverChange = this.handleOverChange.bind(this);
        this.handleHobbiesChange = this.handleHobbiesChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
    }

    
    onButtonCancelClicked() {
    	this.props.history.push("/");
    }
    
    handleSubmit(event) {
    	event.preventDefault();
    	if (!this.isSubmitActivated())
    	{
    		return;
    	}
    	console.log("handleSubmit register");
    	
    	let userData = {
    		userName : this.state.userName,
    		password : this.state.password,
    		firstName : this.state.firstName,
    		lastName : this.state.lastName,
    		yearOfBirth : this.state.yearOfBirth,
    		description : this.state.description,
    		hobbies : this.state.hobbies,
    		gender : this.state.gender
    	};
    	
    	axios.post("/api/user/create", userData, {
            validateStatus: (status) => {
                return (status >= 200 && status < 300 || status === 409 || status === 401)
            }
        }).then(({data, status}) => {
           switch(status) {
	           case 200:
	        	   	this.setState({error : undefined});
	        	   	this.reset();
	        	   	User.set(data);
	        	   	this.props.cookies.set('auth', data);
	        	   	this.props.history.push("/");
	           		break;
	           case 409:
	        	   this.setState({error : "user alredy exist"});
	        	   break;
	           case 401:
	        	   this.setState({error : "already logged in as this user"});
	        	   break;
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
    
    handleGenderChange (event) {
    	this.setState({gender : event.target.value});
    	console.log("handle gender");
    }
    
    handleHobbiesChange (event) {
    	this.setState({hobbies : event.target.value});
    }
    
    handleOverChange (event) {
    	this.setState({description : event.target.value});
    }
    
    handleYearChange(event) {
    	this.setState({yearOfBirth : event.target.value});
    }
    
    handleLastNameChange (event) {
    	this.setState({lastName : event.target.value});
    }
    
    handleFirstNameChange (event) {
    	this.setState({firstName : event.target.value});
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

    	let btnSubmitClasses = "width500 btn center";
    	if (this.isSubmitActivated())
    	{
    		btnSubmitClasses += " btn-success";
    	}
    	
    	const errorStyle = {
    		color : 'red'
    	};
    	
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
					    <span>Profildaten:</span>
					    <div className="form-group">
						    <label>{t('gender')}*</label>
					        <select placeholder={t('gender')} value={this.state.gender} onChange={this.handleGenderChange} className="form-control" type="text">
					        	<option value="Male">{t('male')}</option>
					        	<option value="Female">{t('female')}</option>
					        	<option value="Uncertain">{t('uncertain')}</option>
					        </select>
					    </div>
					    
					    <div className="form-group">
					        <input placeholder={t('firstName')} className="form-control" type="text" value={this.state.firstName}
					        	onChange={this.handleFirstNameChange}></input>
					    </div>
					    <div className="form-group">
					        <input placeholder={t('lastName')} className="form-control" type="text" value={this.state.lastName}
					        	onChange={this.handleLastNameChange}></input>
					    </div>
					    <div className="form-group">
						    <input placeholder={t('yearOfBirth')} className="form-control" type="text" value={this.state.yearOfBirth}
					        	onChange={this.handleYearChange}></input>
					    </div>
					    <div className="form-group">
						    <textarea placeholder={t('overMe')} className="textareHobby form-control" type="text" value={this.state.description}
					        	onChange={this.handleOverChange}></textarea>
					    </div>
					    <div className="form-group">
						    <input placeholder={t('myHobbies')} className="form-control" type="text" value={this.state.hobbies}
					        	onChange={this.handleHobbiesChange}></input>
					    </div>
					    <div className="form-group">
					    	<button id="btnSendRegister" type="submit" className={btnSubmitClasses} >{t('sendSignIn')}</button>
					    </div>
					    <div className="form-group">
					    	<button className="btn btn-danger width500 center" onClick={this.onButtonCancelClicked}>{t('cancel')}</button>
					    </div>
			    	</form>	
			    	{	this.state.error &&
			    		<div style={errorStyle}>{this.state.error}</div>
			    	}
			    	
			    </div>
    	);
    }
}

export default withCookies(translate()(Register));