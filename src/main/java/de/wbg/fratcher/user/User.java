package de.wbg.fratcher.user;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.wbg.fratcher.profile.Profile;

@Entity(name = "User_")
public class User {
	
	public User() {
		this.profile = new Profile();
		this.friends = new LinkedList<>();
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
	
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private List<User> friends;
	
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
