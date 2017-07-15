package de.wbg.fratcher.authentication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import de.wbg.fratcher.user.User;
import de.wbg.fratcher.user.UserService;
import de.wbg.fratcher.util.Util;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class AuthenticationService {
	
	private static final Logger LOG = LoggerFactory.getLogger(AuthenticationService.class);

	private Util util = new Util();
	
    @Autowired
    private UserService userService;

    @Value("${authenticationService.jwt.secret}")
    private String JWTSecret;

    @Value("${authenticationService.salt}")
    private String salt;

    /**
     * Return object containing a valid user and his corresponding JWT token.
     */
    public static class UserToken {
        public User user;
        public String token;
    }


    /**
     * Create a JWT token and additional user information if the user's credentails are valid.
     *
     * @param userName userName
     * @param password password
     * @return a UserToken or null if the credentials are not valid
     */
    public UserToken login(String userName, String password) {
        String hashedPassword = util.hashPassword(password);
        User user = userService.getUser(userName, hashedPassword);
        if (user == null) {
            LOG.info("User unable to login. user={}", userName);
            return null;
        }
        LOG.info("User successfully logged in. user={}", userName);

        String token = Jwts.builder()
                .setSubject(userName)
                .setId(user.getId().toString())
                .signWith(SignatureAlgorithm.HS512, JWTSecret)
                .compact();

        UserToken userToken = new UserToken();
        userToken.user = user;
        userToken.token = token;
        return userToken;
    }


    /**
     * Validate that a token is valid and returns its body.
     *
     * Throws a SignatureException if the token is not valid.
     * @param jwtToken JWT token
     * @return JWT body
     */
    public Object parseToken(String jwtToken) {
        LOG.debug("Parsing JWT token. JWTtoken={}", jwtToken);
        return Jwts.parser()
                .setSigningKey(JWTSecret)
                .parse(jwtToken)
                .getBody();
    }
}
