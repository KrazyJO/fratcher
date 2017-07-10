package de.wbg.fratcher.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public User getUser(String mail, String password)
	{
		User user = userRepository.findByEmailAndPassword(mail, password);
		return user;
	}
}
