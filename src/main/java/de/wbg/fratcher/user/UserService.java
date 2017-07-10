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
}
