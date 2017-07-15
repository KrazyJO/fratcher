package de.wbg.fratcher.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public User getUser(String userName, String password)
	{
		User user = userRepository.findByUserNameAndPassword(userName, password);
		return user;
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
}
