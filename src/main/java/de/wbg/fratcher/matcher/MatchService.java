package de.wbg.fratcher.matcher;

import java.util.ArrayList;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.wbg.fratcher.profile.Profile;
import de.wbg.fratcher.user.User;
import de.wbg.fratcher.user.UserRepository;

@Service
public class MatchService {

	@Autowired
	private UserRepository userRepository;
	
	public LinkedList<Profile> findUserMatches(Long userId)	{
		User user = userRepository.findUserById(userId);
		ArrayList<User> l = new ArrayList<User>(user.getLiked());
		
		Iterable<User> userMatches = userRepository.findMatchesByUser(user.getId(), l);
		
		LinkedList<Profile> userProfiles = new LinkedList<>();
		for (User u : userMatches)
		{
			userProfiles.push(u.getProfile());
		}
		
		return userProfiles;
	}
	
	/**
	 * Get all Userprofiles, which are not liked or disliked by user
	 * @param userId
	 * @return profiles of unseen users
	 */
	public LinkedList<Profile> getUserUnmatched(Long userId)
	{
		User user = userRepository.findUserById(userId);
		ArrayList<User> liked = new ArrayList<User>(user.getLiked());
		ArrayList<User> disliked = new ArrayList<User>(user.getLiked());
		
		Iterable<User> userMatches = userRepository.findUserUnmatched(user.getId(), liked, disliked);
		
		LinkedList<Profile> userProfiles = new LinkedList<>();
		for (User u : userMatches)
		{
			userProfiles.add(u.getProfile());
		}
		
		return userProfiles;
	}
	
}
