package de.wbg.fratcher.matcher;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.wbg.fratcher.user.User;
import de.wbg.fratcher.user.UserRepository;

@Service
public class MatchService {

	@Autowired
	private UserRepository userRepository;
	
	public Iterable<User> findUserMatches(Long userId)	{
		User u = userRepository.findUserById(userId);
		ArrayList<User> l = new ArrayList<User>(u.getLiked());
		
		return userRepository.findMatchesByUser(u.getId(), l);
	}
	
}
