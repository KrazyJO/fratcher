package de.wbg.fratcher.user;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.wbg.fratcher.profile.Profile;

@Entity(name = "User_")
public class User {
	
	public User() {
		this.profile = new Profile();
	}
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String userName;
	@JsonIgnore
	private String password;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnore
	private Profile profile;
	
	
	public Profile getProfile() {
		return profile;
	}
	public String getUserName() {
		return userName;
	}
	public Long getId() {
		return id;
	}
	public String getPassword() {
		return password;
	}
	
	public void setProfile(Profile profile) {
		this.profile = profile;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
