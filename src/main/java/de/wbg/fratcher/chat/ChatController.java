package de.wbg.fratcher.chat;

import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
@RestController
public class ChatController implements WebSocketConfigurer {

	@Autowired
	private MessageRepository messageRepository;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(new ChatHandler(), "/api/chat");
	}
	
	@RequestMapping(value = "/api/chat/{userIdOne}/{userIdTwo}", method = RequestMethod.GET)
	public Iterable<Message> getAllChatEntriesForUser(@PathVariable Long userIdOne, @PathVariable Long userIdTwo) {
		return messageRepository.findMessagesForUser(1L, 2L);
	}

}
