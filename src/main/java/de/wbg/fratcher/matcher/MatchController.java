package de.wbg.fratcher.matcher;

import java.util.ArrayList;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	
	@RequestMapping(value = "/api/matches")
	public ResponseEntity<Iterable<User>> getUsersMatched() 
	{
		if (userService.isAnonymous())
		{
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		
		Long userId = userService.getCurrentUser().getId();
		Iterable<User> userMatches = matchService.findUserMatches(userId);
		
		return ResponseEntity.ok(userMatches);
	}
	
}
