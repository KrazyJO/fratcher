package de.wbg.fratcher.matcher;

import java.util.ArrayList;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.wbg.fratcher.user.User;
import de.wbg.fratcher.user.UserRepository;

@RestController
public class MatchController {

	@Autowired
	private MatchService service;
	
	@RequestMapping(value = "/api/matches/{id}")
	public Iterable<User> getUsersMatched(@PathVariable Long id) {
		Iterable<User> userMatches = service.findUserMatches(id);
		
		return userMatches;
	}
	
}
