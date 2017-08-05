package de.wbg.fratcher.chat;

import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import de.wbg.fratcher.user.User;

public class ChatHandler extends TextWebSocketHandler {
	
	
	private static class UserId {
		public String user;
	}
	
	private ConcurrentLinkedQueue<WebSocketSession> clients;
	
	private ConcurrentHashMap<Long, String> userToSession = new ConcurrentHashMap<>();
	private ConcurrentHashMap<String, Long> sessionToUser= new ConcurrentHashMap<>();
	
    public ChatHandler() {
        clients = new ConcurrentLinkedQueue<>();
    }

    public boolean isUserOnline(User user) {
    	return userToSession.containsKey(user.getId());
    }
    
    public WebSocketSession getSessionForUser(Long Id) {
    	String sessionId = userToSession.get(Id);
    	if (sessionId == null)
    	{
    		return null;
    	}
    	
    	Iterator<WebSocketSession> it = clients.iterator();
    	WebSocketSession session = null;
    	while (it.hasNext()) {
    		WebSocketSession chatPartner = it.next();
    		if (chatPartner.getId() == sessionId)
    		{
    			session = chatPartner;
    			break;
    		}
    	}
    	return session;
    }
    
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        if (message.getPayload().startsWith("{\"user\":\""))
        {
        	ObjectMapper mapper = new ObjectMapper();
        	UserId userId;
        	try
        	{
        		userId = mapper.readValue(message.getPayload(), UserId.class);	
        		userToSession.put(Long.valueOf(userId.user), session.getId());
        		sessionToUser.put(session.getId(), Long.valueOf(userId.user));
        		
        		//say hello
                Iterator<WebSocketSession> it = clients.iterator();
            	while (it.hasNext()) {
            		WebSocketSession chatPartner = it.next();
            		if(chatPartner.isOpen())
            		{
            			chatPartner.sendMessage(new TextMessage("{\"online\":\"" +userId.user+ "\"}"));
            		}
            	}
        	}
        	catch (Exception e)
        	{
        		e.printStackTrace();
        	}
        	
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        clients.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        Long userId = sessionToUser.get(session.getId());
        sessionToUser.remove(session.getId());
        userToSession.remove(userId);
        
        //say goodbye
        Iterator<WebSocketSession> it = clients.iterator();
    	while (it.hasNext()) {
    		WebSocketSession chatPartner = it.next();
    		if(chatPartner.isOpen())
    		{
    			chatPartner.sendMessage(new TextMessage("{\"offline\":\"" +userId+ "\"}"));
    		}
    	}
        
    	clients.remove(session);
    }
	
}
