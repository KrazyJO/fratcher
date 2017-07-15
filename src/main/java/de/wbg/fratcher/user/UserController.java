package de.wbg.fratcher.user;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.wbg.fratcher.util.Util;

@RestController
public class UserController {

	private class Message { 
		public String message;
	}
	
	private Util util = new Util();
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/api/user/create")
	public ResponseEntity<Message> userCreate(@RequestBody User user, HttpServletResponseWrapper response) 
	{
		boolean registered = userService.addUser(user);
		Message m = new Message();
		if (!registered)
		{
			m.message = "User already created";
			ResponseEntity<Message> r = new ResponseEntity<Message>(m, HttpStatus.CONFLICT);
			return r;
		}
		user.setPassword(util.hashPassword(user.getPassword()));
		m.message = "User created"; 
		return ResponseEntity.ok(m);
	}
}
