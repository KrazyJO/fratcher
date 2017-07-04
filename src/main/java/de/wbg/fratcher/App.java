package de.wbg.fratcher;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Starts the app
 *
 */
@EnableSwagger2
@SpringBootApplication
public class App 
{
	private static final Logger LOG = LoggerFactory.getLogger(App.class);
	
    public static void main( String[] args )
    {
        SpringApplication.run(App.class, args);
    }
    
    /**
     * Configuration for Swagger.
     *
     * @return a docket.
     */
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }
}
