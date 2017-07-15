package de.wbg.fratcher.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/api/user/create")
	public void userCreate(@RequestBody User user) 
	{
		userService.addUser(user);
		User u = userService.getUser(user.getUserName(), user.getPassword());
	}
}
