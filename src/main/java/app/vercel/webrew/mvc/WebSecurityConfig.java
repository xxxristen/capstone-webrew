package app.vercel.webrew.mvc;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import app.vercel.webrew.service.CustomUserDetailsService;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;

    @Bean
    public SimpleUrlAuthenticationSuccessHandler authenticationSuccessHandler() {
        SimpleUrlAuthenticationSuccessHandler successHandler = new SimpleUrlAuthenticationSuccessHandler();
        successHandler.setUseReferer(true);
        return successHandler;
    }

    @Bean
    public SimpleUrlLogoutSuccessHandler simpleUrlLogoutSuccessHandler() {
        SimpleUrlLogoutSuccessHandler logoutSuccessHandler = new SimpleUrlLogoutSuccessHandler();
        logoutSuccessHandler.setUseReferer(true);
        return logoutSuccessHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use strong hashing algorithm
    }

    // @Bean
    // public UserDetailsService userDetailsService() {
    // // Use extracted configuration for user details
    // UserDetails user1= User.builder()
    // .username("max")
    // .password("{bcrypt}$2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW")
    // .roles("ADMIN")
    // .build();
    // UserDetails user2= User.builder()
    // .username("christen")
    // .password("{bcrypt}$2a$10$GRLdNijSQMUvl/au9ofL.eDwmoohzzS7.rmNSJZ.0FxO/BTk76klW")
    // .roles("ADMIN")
    // .build();
    // return new InMemoryUserDetailsManager(user1,user2);
    // }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf) -> csrf.disable())
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("add-product.html","add-product", "update-product.html", "update-product").authenticated()
                        .anyRequest().permitAll())
                .httpBasic(Customizer.withDefaults())
                .formLogin((form) -> form
                        .loginPage("/login-page")
                        .loginProcessingUrl("/login")
                        .successHandler(authenticationSuccessHandler())
                        .defaultSuccessUrl("/")
                        .failureUrl("/login-page?error=true")
                        .permitAll())
                .logout((logout) -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessHandler(simpleUrlLogoutSuccessHandler())
                        .logoutSuccessUrl("/")
                        .deleteCookies("JSESSIONID")
                        .permitAll())
                .exceptionHandling(httpSecurityExceptionHandlingConfigurer -> httpSecurityExceptionHandlingConfigurer
                        .accessDeniedPage("/40x"));

        return http.build();
    }
}