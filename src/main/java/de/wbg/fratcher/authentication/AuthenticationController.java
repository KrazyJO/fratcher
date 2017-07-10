package de.wbg.fratcher.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

	@Autowired AuthenticationService authenticationService;
	
	public static class UserLogin {
        public String userName;
        public String password;
    }
	
	@RequestMapping(value = "/api/user/login", method = RequestMethod.POST)
    public ResponseEntity<AuthenticationService.UserToken> login(@RequestBody UserLogin userLogin) {
        AuthenticationService.UserToken token = authenticationService.login(userLogin.userName, userLogin.password);

        if (token == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(token, HttpStatus.OK);
    }
	
}
