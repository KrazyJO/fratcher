package de.wbg.fratcher.chat;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.fasterxml.jackson.databind.ObjectMapper;

import de.wbg.fratcher.matcher.MatchService;
import de.wbg.fratcher.matcher.MatchService.UserWithProfile;
import de.wbg.fratcher.user.User;
import de.wbg.fratcher.user.UserService;

@Service
public class ChatService implements WebSocketConfigurer {

	public static class Notification {
		public String userName;
		public int count;
		public Long userId;
	}
	
	private ChatHandler chatHandler;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		this.chatHandler = new ChatHandler();
		registry.addHandler(this.chatHandler, "/api/chat");
	}
	
	@Autowired
	private MessageRepository messageRepository;
	@Autowired
	private MatchService matchService;
	@Autowired
	private UserService userService;
	
	Iterable<Message> getAllChatEntriesForUsers(Long userIdOne, Long userIdTwo) {
		
		ArrayList<Long> userList = new ArrayList<>();
		userList.add(userIdTwo);
		userList.add(userIdOne);
		return messageRepository.findMessagesForUserByList(userList);
	}
	
	/**
	 * receive, persist and distribute new chatmessages
	 * @param message chatmessage
	 */
	public boolean newMessage(Message message) {
		if (message.getUserIdFrom() != userService.getCurrentUser().getId())
		{
			return false;
		}
		
		this.messageRepository.save(message);
		
		WebSocketSession session = chatHandler.getSessionForUser(message.getUserIdTo());
		if (session != null)
		{
			try {
				ObjectMapper mapper = new ObjectMapper();
				session.sendMessage(new TextMessage(mapper.writeValueAsString(message)));
			} catch (IOException e) {
				System.out.println("error in sendMessage");
				e.printStackTrace();
			}
		}
		else
		{
			System.out.println("no session found");
		}
		return true;
	}
	
	/**
	 * Counts all unread messages for a user.
	 * There will be only notifications entries, if the there are more than zero unread messages
	 * @param id userId
	 * @return
	 */
	public Iterable<Notification> getUserNotifications(Long id) {
		Iterable<UserWithProfile> friends = matchService.findUserMatches(id);
		LinkedList<Notification> notifications = new LinkedList<>();
		int count;
		Notification notification;
		for (UserWithProfile u : friends) {
			count = messageRepository.countUserUnreadMessages(id, u.userId);
			if (count > 0)
			{
				notification = new Notification();
				notification.count = count;
				notification.userName = u.userName;
				notification.userId = u.userId;
				notifications.add(notification);
			}
		}
		
		return notifications;
	}
	
	/**
	 * sets all messages for a chatpartner to read=true
	 * @param userId
	 */
	public void triggerMessagesRead(Long userId) {
		Long myId = userService.getCurrentUser().getId();
		Iterable<Message> messages = messageRepository.findUserUnreadMessages(myId, userId);
		for (Message m : messages) {
			m.setRead(true);
			messageRepository.save(m);
		}
	}
	
	/**
	 * checks if a user is online
	 * @param user
	 * @return true if user is online
	 */
	public boolean isUserOnline(User user) {
		return this.chatHandler.isUserOnline(user);
	}
}
