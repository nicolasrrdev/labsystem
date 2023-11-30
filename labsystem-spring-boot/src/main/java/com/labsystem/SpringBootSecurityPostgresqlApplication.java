/*

package com.labsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootSecurityPostgresqlApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityPostgresqlApplication.class, args);
	}

}

*/

package com.labsystem;

		import org.springframework.boot.SpringApplication;
		import org.springframework.boot.autoconfigure.SpringBootApplication;
		import org.springframework.context.annotation.Bean;
		import org.springframework.web.cors.CorsConfiguration;
		import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
		import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class SpringBootSecurityPostgresqlApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityPostgresqlApplication.class, args);
	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		// Permitir solicitudes desde todos los orígenes
		config.addAllowedOrigin("*");
		// Permitir solicitudes con estos métodos HTTP
		config.addAllowedMethod("GET");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("DELETE");
		// Permitir solicitudes con estos encabezados
		config.addAllowedHeader("Origin");
		config.addAllowedHeader("Content-Type");
		config.addAllowedHeader("Accept");
		config.addAllowedHeader("Authorization");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}
}
