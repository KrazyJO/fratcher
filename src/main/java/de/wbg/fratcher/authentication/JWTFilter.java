package de.wbg.fratcher.authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.GenericFilterBean;

import de.wbg.fratcher.chat.ChatService;
import de.wbg.fratcher.matcher.MatchService;
import de.wbg.fratcher.profile.ProfileService;
import de.wbg.fratcher.user.UserService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTFilter extends GenericFilterBean {
    private static final Logger LOG = LoggerFactory.getLogger(JWTFilter.class);

    private AuthenticationService authenticationService;
    private UserService userService;
    private MatchService matchService;
    private ProfileService profileService;
    private ChatService chatService;
    
    public JWTFilter(AuthenticationService authenticationService, UserService userService, 
    		MatchService matchService, ProfileService profileService,
    		ChatService chatService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.matchService = matchService;
        this.profileService = profileService;
        this.chatService = chatService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        String auth = httpServletRequest.getHeader("Authorization");
        if (!StringUtils.startsWith(auth, "Bearer ")) {
            // Allow requests without a token.
            LOG.debug("No token provided, setting to anonymous user");
            userService.setAnonymous();
            filterChain.doFilter(request, response);
            return;
        }

        // Extract token contents.
        String token = auth.substring(7);
        try {
            Claims body = (Claims) authenticationService.parseToken(token);
            LOG.debug("Successful authentication from id={}, user={}", body.getId(), body.getSubject());
            userService.setCurrentUser(Long.parseLong(body.getId()), body.getSubject());
            filterChain.doFilter(request, response);
        } catch (SignatureException | NullPointerException e) {
            LOG.warn("Token is invalid. token={}", token);
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
