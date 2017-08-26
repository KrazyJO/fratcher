package de.wbg.fratcher.chat;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.PrePersist;

@Entity
public class Message {

	public static final int MESSAGE_LENGTH = 65536;
	
	@Id
	@GeneratedValue
	private Long id;
	@Column(length = Message.MESSAGE_LENGTH)
	private String message;
	private Date createdAt;
	private Long userIdFrom;
	private Long userIdTo;
	private String userNameFrom;
	private boolean read;
	
	public void setUserNameFrom(String userNameFrom) {
		this.userNameFrom = userNameFrom;
	}
	
	public String getUserNameFrom() {
		return userNameFrom;
	}
	
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
	
	@PrePersist
    public void prePersist() {
        createdAt = new Date();
    }
}
