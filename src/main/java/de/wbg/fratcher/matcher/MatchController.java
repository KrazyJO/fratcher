package de.wbg.fratcher.matcher;

import java.util.ArrayList;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.wbg.fratcher.user.User;
import de.wbg.fratcher.user.UserRepository;
import de.wbg.fratcher.user.UserService;

@RestController
public class MatchController {

	@Autowired
	private MatchService matchService;
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/api/matches/{id}")
	public Iterable<User> getUsersMatched(@PathVariable Long id) 
	{
		if (userService.isAnonymous())
		{
			System.out.println("user is anonymous");
		}
		else
		{
			System.out.println("logged in as: " + userService.getCurrentUser().getUserName());
		}
		Iterable<User> userMatches = matchService.findUserMatches(id);
		
		return userMatches;
	}
	
}
