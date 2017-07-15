import React from "react";
import {translate} from "react-i18next";

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
        		gender : "2"
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleOverChange = this.handleOverChange.bind(this);
        this.handleHobbiesChange = this.handleHobbiesChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
    }
    
    componentWillMount() {
    	let oThis = this; 
    	axios.get("/api/profile/1")
    	.then(({data, status}) => {
    		console.log(data);
    		UserProfile.set(data);
    		oThis.state = data;
    		oThis.forceUpdate();
        });
    }
    
    handleSubmit(event) {
    	event.preventDefault();
    	axios.post("/api/profile/1", this.state)
    	.then(({data, status}) => {
    		if (status === 200)
    		{
    			console.log("update profile success");
    		}
    		else
    		{
    			console.log("update profile failed");
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

    	
    	return (
    			<div className="width500 center">
    				<span>{User.getUserName()}</span>
    				<form className="form-horizontal" onSubmit={this.handleSubmit}>
	    				<div className="form-group">
				        	<label>{t('gender')}*</label>
					        <select value={this.state.gender} onChange={this.handleGenderChange} className="form-control" type="text">
					        	<option value="0">Mann</option>
					        	<option value="1">Frau</option>
					        	<option value="2">Ungewiss</option>
					        </select>
					    </div>
    					<div className="form-group">
				        	<label>{t('firstName')}*</label>
					        <input className="form-control" type="text" value={this.state.firstName}
					        	onChange={this.handleFirstNameChange}></input>
					    </div>
					    <div className="form-group">
					    	<label>{t('lastName')}*</label>
					        <input className="form-control" type="text" value={this.state.lastName}
					        	onChange={this.handleLastNameChange}></input>
					    </div>
					    <div className="form-group">
					    	<label>{t('yearOfBirth')}</label>
						    <input className="form-control" type="text" value={this.state.yearOfBirth}
					        	onChange={this.handleYearChange}></input>
					    </div>
					    <div className="form-group">
				    	<label>{t('overMe')}</label>
						    <textarea className="textareHobby form-control" type="text" value={this.state.description}
					        	onChange={this.handleOverChange}></textarea>
					    </div>
					    <div className="form-group">
				    	<label>{t('myHobbies')}</label>
					    <input className="form-control" type="text" value={this.state.hobbies}
				        	onChange={this.handleHobbiesChange}></input>
				    </div>
					    <button className="btn btn-success btnRight" type="submit" >{t('send')}</button>
			    	</form>	
			    	<p className="profileStarDescription"><small>{t('profileStars')}</small></p>
    			</div>
    	);
    }
}

export default translate()(Profile);