package de.wbg.fratcher.chat;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Message {

	@Id
	@GeneratedValue
	private Long id;
	private String message;
	private Date createdAt;
	private Long userIdFrom;
	private Long userIdTo;
	private boolean read;
	
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public void setUserIdFrom(Long userIdFrom) {
		this.userIdFrom = userIdFrom;
	}
	public void setUserIdTo(Long userIdTo) {
		this.userIdTo = userIdTo;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setRead(boolean read) {
		this.read = read;
	}
	
	public Date getCreatedAt() {
		return createdAt;
	}
	public String getMessage() {
		return message;
	}
	public Long getUserIdFrom() {
		return userIdFrom;
	}
	public Long getUserIdTo() {
		return userIdTo;
	}
	public Long getId() {
		return id;
	}
	public boolean getRead() {
		return read;
	}
	
}
