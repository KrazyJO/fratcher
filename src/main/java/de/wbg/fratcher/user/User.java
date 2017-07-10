package de.wbg.fratcher.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "User_")
public class User {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String userName;
	private String password;
	
	public String getUserName() {
		return userName;
	}
	public Long getId() {
		return id;
	}
	public String getPassword() {
		return password;
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
