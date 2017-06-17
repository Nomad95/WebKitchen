package org.JKDW.security.service;


import org.JKDW.security.model.SpringSecurityUser;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service(value = "userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserAccountService userAccountService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         UserAccount userAccount = this.userAccountService.loadUserByUsername(username);

        if (userAccount == null) {
            throw new UsernameNotFoundException(String.format("No appUser found with username '%s'.", username));
        } else {
            return new SpringSecurityUser(
                    userAccount.getId(),
                    userAccount.getUsername(),
                    userAccount.getPassword(),
                    null,
                    null,
                    AuthorityUtils.commaSeparatedStringToAuthorityList(userAccount.getAuthorities())
            );
        }
    }

}
