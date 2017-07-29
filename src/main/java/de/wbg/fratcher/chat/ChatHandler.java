package de.wbg.fratcher.chat;

import java.util.Iterator;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class ChatHandler extends TextWebSocketHandler {
	
	
	private ConcurrentLinkedQueue<WebSocketSession> clients;

    public ChatHandler() {
        clients = new ConcurrentLinkedQueue<>();
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Iterator<WebSocketSession> it = clients.iterator();
        while (it.hasNext()) {
            WebSocketSession chatPartner = it.next();
            if (chatPartner.equals(session)) {
                // Do not send messages to yourself.
                continue;
            }

            chatPartner.sendMessage(message);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        clients.add(session);
        session.sendMessage(new TextMessage("say hello to the server :)"));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        clients.remove(session);
    }
	
}
