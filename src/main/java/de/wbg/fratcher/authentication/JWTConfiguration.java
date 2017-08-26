package de.wbg.fratcher.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import de.wbg.fratcher.chat.ChatService;
import de.wbg.fratcher.matcher.MatchService;
import de.wbg.fratcher.profile.ProfileService;
import de.wbg.fratcher.user.UserService;

@Configuration
public class JWTConfiguration {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private MatchService matchService;
    
    @Autowired
    private ProfileService profileService;
    
    @Autowired
    private ChatService chatService;

    @Bean
    public FilterRegistrationBean jwtFilter() {
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new JWTFilter(authenticationService, userService, matchService, profileService, chatService));
        bean.addUrlPatterns("/api/*");
        return bean;
    }
}
