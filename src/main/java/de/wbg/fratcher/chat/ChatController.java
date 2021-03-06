package de.wbg.fratcher.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

import de.wbg.fratcher.chat.ChatService.Notification;
import de.wbg.fratcher.user.UserService;

@Configuration
@EnableWebSocket
@RestController
public class ChatController {

	@Autowired
	private ChatService chatService;
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/api/chatmessage", method = RequestMethod.POST)
	public ResponseEntity<Message> postMessage(@RequestBody Message message) {
		
		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		if (!chatService.newMessage(message))
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		return ResponseEntity.ok(message);
	}
	
	@RequestMapping(value = "/api/chat/{userIdTwo}", method = RequestMethod.GET)
	public ResponseEntity<Iterable<Message>> getChatMessages(@PathVariable Long userIdTwo) {

		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		Long userIdOne = userService.getCurrentUser().getId();
		Iterable<Message> messages = chatService.getAllChatEntriesForUsers(userIdOne, userIdTwo);
		
		return ResponseEntity.ok(messages);
		
	}
	
	@RequestMapping(value = "/api/chat/notification", method = RequestMethod.GET)
	public ResponseEntity<Iterable<Notification>> getUserNotifications() {
		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		Long userId = userService.getCurrentUser().getId();
		
		Iterable<Notification> notifications = chatService.getUserNotifications(userId);
		
		return ResponseEntity.ok(notifications);
	}

	@RequestMapping(value = "/api/chat/messagesRead/{userId}", method = RequestMethod.POST)
	public ResponseEntity<Object> triggerMessagesRead(@PathVariable Long userId) {
		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		chatService.triggerMessagesRead(userId);
		
		return ResponseEntity.ok(null);
	}
	
}
