package de.wbg.fratcher.matcher;

import java.util.ArrayList;
import java.util.LinkedList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.wbg.fratcher.chat.ChatHandler;
import de.wbg.fratcher.chat.ChatService;
import de.wbg.fratcher.profile.Profile;
import de.wbg.fratcher.user.User;
import de.wbg.fratcher.user.UserRepository;
import de.wbg.fratcher.user.UserService;

@Service
public class MatchService {

	private static final Logger LOG = LoggerFactory.getLogger(MatchService.class);
	
	public class UserWithProfile {
		public Long userId;
		public String userName;
		public Profile profile;
		public boolean online;
	}
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ChatService chatService;
	
	public Iterable<UserWithProfile> findUserMatches(Long userId)	{
		User user = userRepository.findUserById(userId);
		if (user.getLiked().size() == 0)
		{
			return new ArrayList<UserWithProfile>();
		}
		else
		{
			ArrayList<User> liked = new ArrayList<User>(user.getLiked());
			Iterable<User> userMatches = userRepository.findMatchesByUser(user.getId(), liked);
			return this.createUserWithProfiles(userMatches);
		}
	}
	
	/**
	 * https://stackoverflow.com/questions/2488930/passing-empty-list-as-parameter-to-jpa-query-throws-error
	 * since no empty lists work with postgresql, the empty liked and disliked array got push the current user 
	 * 
	 * Get all Userprofiles, which are not liked or disliked by user
	 * @param userId
	 * @return profiles of unseen users
	 */
	public Iterable<UserWithProfile> getUserUnmatched(Long userId)
	{
		User user = userRepository.findUserById(userId);
		ArrayList<User> liked = new ArrayList<User>(user.getLiked());
		ArrayList<User> disliked = new ArrayList<User>(user.getDisliked());
		
		//this is the fix for heroku...
		if (liked.size() == 0)
		{
			liked.add(userService.getCurrentUser());
		}
		if (disliked.size() == 0)
		{
			disliked.add(userService.getCurrentUser());
		}
		
		Iterable<User> userUnmatched = userRepository.findUserUnmatched(user.getId(), liked, disliked);
		
		LOG.info("user {} fetches unmatched list", userId);
		
		return this.createUserWithProfiles(userUnmatched);
	}
	
	public void likeUser(Long id)
	{
		User user = userRepository.findUserById(id);
		User currentUser = userRepository.findUserById(userService.getCurrentUser().getId());
		currentUser.getLiked().add(user);
		userRepository.save(currentUser);
		LOG.info("user {} liked user {}", currentUser.getId(), id);
		
		//match?
		User u = userRepository.findSpecificMatcheByUser(currentUser.getId(), id);
		if (u != null)
		{
			chatService.notifyNewMatch(currentUser.getId(), u.getId());
			LOG.info("new match registered for user {} with user {}", currentUser.getId(), id);
		}
		
		
	}
	
	public void dislikeUser(Long id)
	{
		User user = userRepository.findUserById(id);
		User currentUser = userRepository.findUserById(userService.getCurrentUser().getId());
		currentUser.getDisliked().add(user);
		userRepository.save(currentUser);
		LOG.info("user {} disliked user {}", currentUser.getId(), id);
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
			userWithProfile.online = chatService.isUserOnline(u);
			profiles.add(userWithProfile);
		}
		
		return profiles;
	}
}
