package de.wbg.fratcher.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class ChatService {

	@Autowired
	private MessageRepository messageRepository;
	
	Iterable<Message> getAllChatEntriesForUsers(@PathVariable Long userIdOne, @PathVariable Long userIdTwo) {
		return messageRepository.findMessagesForUser(1L, 2L);
	}
	
}
