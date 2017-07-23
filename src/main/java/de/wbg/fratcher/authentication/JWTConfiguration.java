package de.wbg.fratcher.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import de.wbg.fratcher.matcher.MatchService;
import de.wbg.fratcher.user.UserService;

@Configuration
public class JWTConfiguration {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private MatchService matchService;

    @Bean
    public FilterRegistrationBean jwtFilter() {
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new JWTFilter(authenticationService, userService, matchService));
        bean.addUrlPatterns("/api/*");
        return bean;
    }
}
