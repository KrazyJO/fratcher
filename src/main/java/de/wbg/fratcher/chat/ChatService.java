package de.wbg.fratcher.chat;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.fasterxml.jackson.databind.ObjectMapper;

import de.wbg.fratcher.user.User;

@Service
public class ChatService implements WebSocketConfigurer {

	private ChatHandler chatHandler;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		this.chatHandler = new ChatHandler();
		registry.addHandler(this.chatHandler, "/api/chat");
	}
	
	@Autowired
	private MessageRepository messageRepository;
	
	Iterable<Message> getAllChatEntriesForUsers(@PathVariable Long userIdOne, @PathVariable Long userIdTwo) {
		return messageRepository.findMessagesForUser(1L, 2L);
	}
	
	public void newMessage(Message message) {
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
	}
	
	public boolean isUserOnline(User user) {
		return this.chatHandler.isUserOnline(user);
	}
}
