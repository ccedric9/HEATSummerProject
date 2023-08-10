package com.best.heatBackEnd.security.config;

import com.best.heatBackEnd.appuser.AppUser;
import com.best.heatBackEnd.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.core.GrantedAuthority;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final AppUserService appUserService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    // Create a Logger instance
    private static final Logger logger = LoggerFactory.getLogger(WebSecurityConfig.class);

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors() // 允许CORS配置
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/v*/registration/**", "/calendarEvents","/calendarEvents/*")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .formLogin()
                .successHandler(successHandler())
                .failureHandler(failureHandler());
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost", "http://assessmentcalendar.s3-website.eu-west-2.amazonaws.com")); // 可以替换为你自己的域名
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "HEAD"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                Authentication authentication) throws IOException, ServletException {
//                logger.info("Authentication success. User: " + authentication.getName());
//                logger.info("Username: " + request.getParameter("username"));
//                logger.info("Password: " + request.getParameter("password"));

                // Cast the authenticated principal to UserDetails
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();

                // Create a JSONObject
                JSONObject resp = new JSONObject();

                try {
                    // Put user information into the JSON object
                    resp.put("status", "success");
                    AppUser appUser = (AppUser) authentication.getPrincipal();
                    resp.put("email", appUser.getEmail());
                    resp.put("firstName", appUser.getFirstName());
                    resp.put("lastName", appUser.getLastName());
                    resp.put("major", appUser.getMajor());
                    resp.put("staff", appUser.getStaff());
                    resp.put("entryYear", appUser.getEntryYear());
//                    resp.put("courses", appUser.getCourses());

//                    logger.info("courses: " + appUser.getCourses());
                    resp.put("authorities", userDetails.getAuthorities().stream()
                            .map(GrantedAuthority::getAuthority)
                            .collect(Collectors.toList()));

                } catch (JSONException e) {
                    // Handle or log the error according to your need
                }

                response.getWriter().print(resp.toString());
                response.getWriter().flush();
            }
        };
    }


    @Bean
    public AuthenticationFailureHandler failureHandler() {
        return new AuthenticationFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                                AuthenticationException exception) throws IOException, ServletException {
                logger.info("Authentication failed. Error: " + exception.getMessage());
                // Print the username and password
                logger.info("Username: " + request.getParameter("username"));
                logger.info("Password: " + request.getParameter("password"));
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().print("{\"status\": \"error\", \"message\": \"" + exception.getMessage() + "\"}");
                response.getWriter().flush();
            }
        };
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();
        provider.setPasswordEncoder(bCryptPasswordEncoder);
        provider.setUserDetailsService(appUserService);
        return provider;
    }
}
