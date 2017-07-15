package de.wbg.fratcher.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.wbg.fratcher.util.Util;

@RestController
public class UserController {

	private Util util = new Util();
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/api/user/create")
	public void userCreate(@RequestBody User user) 
	{
		userService.addUser(user);
		user.setPassword(util.hashPassword(user.getPassword()));
		User u = userService.getUser(user.getUserName(), user.getPassword());
		System.out.println("u: " + user.getUserName() + ", p: " + user.getPassword());
	}
}
