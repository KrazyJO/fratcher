import React from "react";
import {translate} from "react-i18next";

import axios from "axios";
import User from "./../Util/User";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		firstName : "",
        		lastName : "",
        		year : "",
        		over : "",
        		hobbies : ""        			
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleOverChange = this.handleOverChange.bind(this);
        this.handleHobbiesChange = this.handleHobbiesChange.bind(this);
    }
    
    handleHobbiesChange (event) {
    	this.setState({hobbies : event.target.value});
    	
    }
    
    handleOverChange (event) {
    	this.setState({over : event.target.value});
    }
    
    handleYearChange(event) {
    	this.setState({year : event.target.value});
    }
    
    handleLastNameChange (event) {
    	this.setState({lastName : event.target.value});
    }
    
    handleFirstNameChange (event) {
    	this.setState({firstName : event.target.value});
    }

    handleSubmit(event) {
    	console.log("submit profile");
    }
    
    
    
    render () {
    	const {t} = this.props;

    	
    	return (
    			<div className="width500 center">
    				<span>{User.getUserName()}</span>
    				<form className="form-horizontal" onSubmit={this.handleSubmit}>
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
						    <input className="form-control" type="text" value={this.state.year}
					        	onChange={this.handleYearChange}></input>
					    </div>
					    <div className="form-group">
				    	<label>{t('overMe')}</label>
						    <textarea className="textareHobby form-control" type="text" value={this.state.over}
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