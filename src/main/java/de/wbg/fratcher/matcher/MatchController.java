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
	private UserRepository userRepository;
	
	@RequestMapping(value = "/api/matches/{id}")
	public Iterable<User> getUsersMatched(@PathVariable Long id) {
//		User u = userRepository.findUserByUserName("bob");
		User u = userRepository.findUserById(id);
		ArrayList<User> l = new ArrayList<User>(u.getLiked());
		
		return userRepository.findMatchesByUser(u.getId(), l);
	}
	
}
