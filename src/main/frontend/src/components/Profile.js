import React from "react";
import {translate} from "react-i18next";
import Events from 'pubsub-js';
import axios from "axios";
import User from "./../Util/User";
import UserProfile from "./../Util/UserProfile";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		firstName : "",
        		lastName : "",
        		yearOfBirth : "",
        		description : "",
        		hobbies : "",
        		gender : "2",
        		profileId : ""
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleOverChange = this.handleOverChange.bind(this);
        this.handleHobbiesChange = this.handleHobbiesChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.reset = this.reset.bind(this);
        this.fetchProfile = this.fetchProfile.bind(this);
    }
    
    reset () {
    	this.state = {
        		firstName : "",
        		lastName : "",
        		yearOfBirth : "",
        		description : "",
        		hobbies : "",
        		gender : "2",
        		userId : ""
        };
    }
    
    /**
     * recognize hash change:
     * https://stackoverflow.com/questions/38965807/how-to-rerender-a-component-when-hash-change-and-change-the-state 
     */
    componentWillReceiveProps(nextProps) {
    	  const {match: {params: {profileId}}} = nextProps;
    	  if(profileId !== this.props.match.params.profileId){
    	    /////////
    		  console.log("new props");
    		  this.fetchProfile(profileId);
    	  }
    	}
    
    componentWillMount() {
    	console.log("mount");
    	this.reset();
    	let iProfileId = this.props.match.params.profileId;
    	if (!iProfileId)
    	{
    		return;
    	}
    	if (iProfileId === User.getId())
    	{
    		console.log("my own profile");
    	}
    	this.fetchProfile(iProfileId);
    }
    
    fetchProfile(userId) {
    	let oThis = this;
    	axios.get("/api/profile/" + userId)
    	.then(({data, status}) => {
    		if (data.gender === null)
    		{
    			data.gender = 2;
    		}
    		var aKeys = Object.keys(data);
    		aKeys.forEach(key => {
    			if (data[key] === null)
    			{
    				data[key] = "";
    			}
    		});
    		oThis.state = data;
    		oThis.setState({userId : userId}); //<-- this forces update
        });
    }
    
    handleSubmit(event) {
    	event.preventDefault();
    	axios.post("/api/profile/"+User.getId(), this.state)
    	.then(({data, status}) => {
    		if (status === 200)
    		{
    			if (User.isInRegistrationProcess())
    			{
    				//ended with registration process, nav user to home
    				User.inRegistrationProcess = false;
    				this.props.history.push("/");
    				Events.publish("loggedInFromRegister");
    			}
    		}
    		else
    		{
    			console.error("update profile failed");
    		}
        })
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

    render () {
    	const {t} = this.props;
    	let bDisabled = !(User.getId() == this.state.userId); 
    	
    	return (
    			<div className="width500 center">
    				{
    					User.isInRegistrationProcess() &&
    					<span>Nur noch ein Schritt...</span>
    				}
    				<span>{User.getUserName()}</span>
    				<form className="form-horizontal" onSubmit={this.handleSubmit}>
	    				<div className="form-group">
				        	<label>{t('gender')}*</label>
					        <select disabled={bDisabled} value={this.state.gender} onChange={this.handleGenderChange} className="form-control" type="text">
					        	<option value="Male">{t('male')}</option>
					        	<option value="Female">{t('female')}</option>
					        	<option value="Uncertain">{t('uncertain')}</option>
					        </select>
					    </div>
    					<div className="form-group">
				        	<label>{t('firstName')}*</label>
					        <input disabled={bDisabled} className="form-control" type="text" value={this.state.firstName}
					        	onChange={this.handleFirstNameChange}></input>
					    </div>
					    <div className="form-group">
					    	<label>{t('lastName')}*</label>
					        <input disabled={bDisabled} className="form-control" type="text" value={this.state.lastName}
					        	onChange={this.handleLastNameChange}></input>
					    </div>
					    <div className="form-group">
					    	<label>{t('yearOfBirth')}</label>
						    <input disabled={bDisabled} className="form-control" type="text" value={this.state.yearOfBirth}
					        	onChange={this.handleYearChange}></input>
					    </div>
					    <div className="form-group">
				    	<label>{t('overMe')}</label>
						    <textarea disabled={bDisabled} className="textareHobby form-control" type="text" value={this.state.description}
					        	onChange={this.handleOverChange}></textarea>
					    </div>
					    <div className="form-group">
				    	<label>{t('myHobbies')}</label>
					    <input disabled={bDisabled} className="form-control" type="text" value={this.state.hobbies}
				        	onChange={this.handleHobbiesChange}></input>
				    </div>
					    { !bDisabled &&
					    	<button className="btn btn-success btnRight" type="submit" >{t('send')}</button>
					    }
			    	</form>	
			    	{ !bDisabled &&
			    		<p className="profileStarDescription"><small>{t('profileStars')}</small></p>
			    	}
    			</div>
    	);
    }
}

export default translate()(Profile);