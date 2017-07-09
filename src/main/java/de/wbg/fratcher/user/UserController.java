package de.wbg.fratcher.user;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@RequestMapping(value = "/api/user/create")
	public void userCreate() 
	{
		
	}
}
