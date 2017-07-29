package de.wbg.fratcher.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import de.wbg.fratcher.user.UserService;

@Configuration
@EnableWebSocket
@RestController
public class ChatController implements WebSocketConfigurer {

	@Autowired
	private ChatService chatService;
	@Autowired
	private UserService userService;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new ChatHandler(), "/api/chat");
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
