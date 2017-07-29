package de.wbg.fratcher.chat;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.fasterxml.jackson.databind.ObjectMapper;

import de.wbg.fratcher.user.UserService;

@Configuration
@EnableWebSocket
@RestController
public class ChatController implements WebSocketConfigurer {

	@Autowired
	private ChatService chatService;
	@Autowired
	private UserService userService;
	
	private ChatHandler chatHandler;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		this.chatHandler = new ChatHandler();
		registry.addHandler(this.chatHandler, "/api/chat");
	}
	
	@RequestMapping(value = "/api/chatmessage", method = RequestMethod.POST)
	public ResponseEntity<Message> postMessage(@RequestBody Message message) {
		
		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		chatService.newMessage(message);
		
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
		
		return ResponseEntity.ok(message);
	}
	
	@RequestMapping(value = "/api/chat/{userIdOne}/{userIdTwo}", method = RequestMethod.GET)
	public ResponseEntity<Iterable<Message>> getChatMessages(@PathVariable Long userIdOne, @PathVariable Long userIdTwo) {
		
		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		Iterable<Message> messages = chatService.getAllChatEntriesForUsers(userIdOne, userIdTwo);
		
		return ResponseEntity.ok(messages);
		
	}

}
