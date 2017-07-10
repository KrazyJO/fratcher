package de.wbg.fratcher.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String email;
	private String password;
	
	public String getEmail() {
		return email;
	}
	public Long getId() {
		return id;
	}
	public String getPassword() {
		return password;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
