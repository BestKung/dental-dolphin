package th.co.geniustree.dental.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.AntPathMatcher;
import th.co.geniustree.dental.service.CustomUserService;

/**
 * @author pramoth
 */
@Configuration
@EnableWebMvcSecurity()
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserService customUserService;

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().formLogin()
                .loginPage("/pages/login.html")
                .loginProcessingUrl("/login").usernameParameter("email").passwordParameter("password")
                .defaultSuccessUrl("/index.html")
                .permitAll()
                .failureUrl("/pages/login-error.html")
                .and()
                .logout()
                .logoutUrl("/logout")
                .deleteCookies("JSESSIONID")
                .permitAll()
                .and()
                .authorizeRequests().anyRequest().authenticated();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/console/*")
                .antMatchers("/css/**")
                .antMatchers("/js/**")
                .antMatchers("/materialize/**")
                .antMatchers("/image/**")
                .antMatchers("/bootstrap-3.3.6-dist/**");
    }

}
