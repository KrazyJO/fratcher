package de.wbg.fratcher.profile;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

import de.wbg.fratcher.util.Gender;

@Entity
public class Profile {

	@Id
//    @JsonIgnore
    @GeneratedValue
	private Long id;
	
	private String description;
	
	private Date createdAt;
	
	private Gender gender;
	
	private Date dateOfBirth;
	
	private String hobbies;
	
	public Date getCreatedAt() {
		return createdAt;
	}
	
	public Date getDateOfBirth() {
		return dateOfBirth;
	}
	
	public String getDescription() {
		return description;
	}
	
	public Gender getGender() {
		return gender;
	}
	
	public String getHobbies() {
		return hobbies;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public void setHobbies(String hobbies) {
		this.hobbies = hobbies;
	}
	public void setId(Long id) {
		this.id = id;
	}
}
