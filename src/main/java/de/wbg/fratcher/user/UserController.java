package de.wbg.fratcher.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import de.wbg.fratcher.authentication.AuthenticationService;
import de.wbg.fratcher.profile.Profile;
import de.wbg.fratcher.profile.ProfileService;
import de.wbg.fratcher.util.Gender;
import de.wbg.fratcher.util.Util;

@RestController
public class UserController {

	private static class UserCreate {
		public String userName;
		public String password;
		public Gender gender;
		public String yearOfBirth;
		public String hobbies;
		public String firstName;
		public String lastName;
		public String description;
	}
	
	@Autowired
	private Util util;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProfileService profileService;
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@RequestMapping(value = "/api/user/create", method = RequestMethod.POST)
	public ResponseEntity<AuthenticationService.UserToken> userCreate(@RequestBody UserCreate user) 
	{
		User u = new User();
		
		String unhashedPassword = user.password;
		u.setPassword(util.hashPassword(unhashedPassword));
		u.setUserName(user.userName);
		boolean registered = userService.addUser(u);
		if (!registered)
		{
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		AuthenticationService.UserToken token = authenticationService.login(u.getUserName(), unhashedPassword);
		if (token == null) {
			//should not happen...
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
		
		//profile data
		Profile p = u.getProfile();
		
		p.setDescription(user.description);
		p.setFirstName(user.firstName);
		p.setGender(user.gender);
		p.setHobbies(user.hobbies);
		p.setLastName(user.lastName);
		p.setYearOfBirth(user.yearOfBirth);
		
		profileService.addProfile(p);
		
		return ResponseEntity.ok(token);
	}
}
