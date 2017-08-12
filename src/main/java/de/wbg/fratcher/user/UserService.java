package de.wbg.fratcher.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	/**
	 * call this method only internally
	 * @param userId
	 * @return
	 */
	public Long getProfileIdFromUser(Long userId)
	{
		User user = userRepository.findOne(userId);
		Long id = -1L;
		if (user != null)
		{
			id = user.getProfile().getId();
		}
		return id;
	}
	
	public User getUser(String userName, String password)
	{
		User user = userRepository.findByUserNameAndPassword(userName, password);
		return user;
	}
	
	public boolean isUserMatched(Long userId)
	{
		Long me = this.getCurrentUser().getId();
		User user = userRepository.findSpecificMatcheByUser(me, userId);
		if (user != null)
		{
			return true;
		}
		return false;
	}
	
	public boolean addUser(User user)
	{
		String userName = userRepository.findByUserName(user.getUserName());
		if (userName != null)
		{
			System.out.println("user already registerd");
			return false;
		}
		
		userRepository.save(user);
		return true;
	}
	
	/**
     * Sets the current user to anonymous.
     */
    public void setAnonymous() {
        setCurrentUser(-1L, "<anonymous>");
    }


    /**
     * Check if the current user is not authenticated.
     *
     * @return true if the user is not authenticated.
     */
    public boolean isAnonymous() {
        return getCurrentUser().getId() == -1L;
    }


    /**
     * Retrieve the currently active user or null, if no user is logged in.
     *
     * @return the current user.
     */
    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    /**
     * Set a user for the current request.
     *
     * @param id    user id
     * @param email user email
     */
    public void setCurrentUser(Long id, String userName) {
//        LOG.debug("Setting user context. id={}, user={}", id, userName);
//        User user = new User();
//        user.setId(id);
//        user.setUserName(userName);
    	User user = userRepository.findOne(id);
        UsernamePasswordAuthenticationToken secAuth = new UsernamePasswordAuthenticationToken(user, null);
        SecurityContextHolder.getContext().setAuthentication(secAuth);
        
        
    }
}
