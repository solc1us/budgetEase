package budgetEase.mainapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class MainappApplication {

	public static void main(String[] args) {
		SpringApplication.run(MainappApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			 @Override
            public void addCorsMappings(CorsRegistry registry) {
							registry.addMapping("/**")
							.allowedOriginPatterns("*")
							.allowedMethods("GET", "POST", "PUT", "DELETE")
							.allowedHeaders("*")
							.allowCredentials(true)
							.maxAge(3600);
        }
		};
	}
}
