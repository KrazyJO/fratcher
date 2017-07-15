package de.wbg.fratcher.user;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.wbg.fratcher.authentication.AuthenticationService;
import de.wbg.fratcher.util.Util;

@RestController
public class UserController {

	private static class UserCreate {
		public String userName;
		public String password;
	}
	
	@Autowired
	private Util util;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@RequestMapping(value = "/api/user/create")
	public ResponseEntity<AuthenticationService.UserToken> userCreate(@RequestBody UserCreate user, HttpServletResponseWrapper response) 
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
		HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", "auth=bearer " + token.token);
        return new ResponseEntity<>(token,  headers, HttpStatus.OK);
	}
}
