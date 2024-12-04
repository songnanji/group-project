package com.mysite.demo1.Network;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;


@Configuration
@EnableWebSecurity
public class SecuirtyConfig {

    //cors 설정을 위해서 명시적으로 클래스도 만들고 따로 설정함.
    private final CorsConfigurationSource corsConfigurationSource;
    public SecuirtyConfig(CorsConfigurationSource corsConfigurationSource) {
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource)) // 새로운 방식으로 CORS 설정 적용

                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/error","/","/api/signup","/api/login","/api/movies/search",
                                "api/movies/**","/api/movies/random","/api/board","/api/board/**",
                                "api/comments","api/comments/**","api/change-password","/h2-console/**",
                                "/api/reviews","/api/reviews/movie/**").permitAll() // 경로 허용

                        .requestMatchers("/favicon.ico", "/**/favicon.ico").permitAll()
                        .anyRequest().authenticated() // 나머지 요청은 인증 필요
                )
                .headers((headers)-> headers
                        .addHeaderWriter(new XFrameOptionsHeaderWriter(
                                XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN
                        )))//프레임 구조에 대한 해결.

        ;

        return http.build();
    }





    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
