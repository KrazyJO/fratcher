package de.wbg.fratcher.matcher;

import java.util.ArrayList;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.wbg.fratcher.profile.Profile;
import de.wbg.fratcher.user.User;
import de.wbg.fratcher.user.UserRepository;
import de.wbg.fratcher.user.UserService;

@Service
public class MatchService {

	public class UserWithProfile {
		public Long userId;
		public String userName;
		public Profile profile;
	}
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	public Iterable<UserWithProfile> findUserMatches(Long userId)	{
		User user = userRepository.findUserById(userId);
		ArrayList<User> liked = new ArrayList<User>(user.getLiked());
		
		Iterable<User> userMatches = userRepository.findMatchesByUser(user.getId(), liked);
		
		return this.createUserWithProfiles(userMatches);
		
//		return userMatches;
	}
	
	/**
	 * Get all Userprofiles, which are not liked or disliked by user
	 * @param userId
	 * @return profiles of unseen users
	 */
	public Iterable<UserWithProfile> getUserUnmatched(Long userId)
	{
		User user = userRepository.findUserById(userId);
		ArrayList<User> liked = new ArrayList<User>(user.getLiked());
		ArrayList<User> disliked = new ArrayList<User>(user.getDisliked());
		
		Iterable<User> userUnmatched = userRepository.findUserUnmatched(user.getId(), liked, disliked);
//		LinkedList<UserWithProfile> unmatched = new LinkedList<>();
//		UserWithProfile userWithProfile;
//		for (User u : userUnmatched)
//		{
//			userWithProfile = new UserWithProfile();
//			userWithProfile.userId = u.getId();
//			userWithProfile.userName = u.getUserName();
//			userWithProfile.profile = u.getProfile();
//			unmatched.add(userWithProfile);
//		}
//		
//		return unmatched;
		
		return this.createUserWithProfiles(userUnmatched);
	}
	
	public void likeUser(Long id)
	{
		User user = userRepository.findUserById(id);
		User currentUser = userRepository.findUserById(userService.getCurrentUser().getId());
		currentUser.getLiked().add(user);
		userRepository.save(currentUser);
	}
	
	public void dislikeUser(Long id)
	{
		User user = userRepository.findUserById(id);
		User currentUser = userRepository.findUserById(userService.getCurrentUser().getId());
		currentUser.getDisliked().add(user);
		userRepository.save(currentUser);
	}
	
	private LinkedList<UserWithProfile> createUserWithProfiles(Iterable<User> users)
	{
		LinkedList<UserWithProfile> profiles = new LinkedList<>();
		UserWithProfile userWithProfile;
		for (User u : users)
		{
			userWithProfile = new UserWithProfile();
			userWithProfile.userId = u.getId();
			userWithProfile.userName = u.getUserName();
			userWithProfile.profile = u.getProfile();
			profiles.add(userWithProfile);
		}
		
		return profiles;
	}
}
