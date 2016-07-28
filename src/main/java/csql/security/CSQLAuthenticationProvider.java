package csql.security;

import csql.model.User;
import csql.service.UserService;
import csql.util.security.Crypto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
public class CSQLAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    UserService userService;

    @Value("${app.suUsername}")
    private String suUsername;
    @Value("${app.suPassword}")
    private String suPassword;

    public CSQLAuthenticationProvider() {
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {


        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;
        String username = token.getName();
        String password = (String)token.getCredentials();

        if(username.equalsIgnoreCase(suUsername) && password.equals(suPassword)){
            User u = new User();
            u.setRole("ADMIN");
            u.setUsername(username);
            return getAuthenticationToken(u, authentication);
        }


        User user = userService.findByUsername(username);

        if(user == null)
            throw new BadCredentialsException("User doesnot exist");

        if(user.getPassword() ==null || !Crypto.decrypt(user.getPassword()).equals(password)){
            throw new BadCredentialsException("Bad password");
        }

        return getAuthenticationToken(user,authentication);

    }

    private Authentication getAuthenticationToken(User user, Authentication authentication){
        final CSQLUserDetails principal = new CSQLUserDetails(user);

        final Authentication authenticationToken =
                new UsernamePasswordAuthenticationToken(principal, null,getAuthorityList(user));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return authenticationToken;
    }


    private Collection<? extends GrantedAuthority> getAuthorityList(User user) {
        return AuthorityUtils.createAuthorityList(user.getRole());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
