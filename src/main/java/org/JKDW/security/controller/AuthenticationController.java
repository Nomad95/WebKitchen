package org.JKDW.security.controller;

import org.JKDW.security.AppConstant;
import org.JKDW.security.TokenUtils;
import org.JKDW.security.model.AuthenticationRequest;
import org.JKDW.security.model.AuthenticationResponse;
import org.JKDW.security.model.SpringSecurityUser;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@RestController
@RequestMapping("auth")
public class AuthenticationController  {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserAccountService userAccountService;


    /** Metoda po wykonaniu żądania POST z username i hasłem zwraca token zawierający zaszyfrowane hasło, username,
     *  date utworzenia i ważności tokena i kilka innych informacji. Oczywiście można dodać swoje , jakie bd potrzebne do
     *  aplikacji ale narazie te podstawowe wystarczą
     */

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> authenticationRequest(@RequestBody AuthenticationRequest authenticationRequest)
            throws AuthenticationException {

        // Perform the authentication
        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Reload password post-authentication so we can generate token
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        String token = this.tokenUtils.generateToken(userDetails);
        //to update lastLogged date
        UserAccount userAccount = this.userAccountService.loadUserByUsername(authenticationRequest.getUsername());
        userAccount.setLastLogged(new Date());
        this.userAccountService.updateUserAccount(userAccount);

        // Return the token
        return ResponseEntity.ok(new AuthenticationResponse(token));
    }


    /** Metoda z tego co tak patrzyłem to odświeża token ale nie wiem jeszcze czy czy metoda zmienia wartość tokena
     * czy generuje nowy token. Jak to drugie to trzeba będzie jeszcze dopisać do metody usunięcie poprzedniego
     * tokena. Można by było wprowadzić zmienną dezaktywującą token bo chyba nie ma jej ale to się pomyśli już później
     */
    @RequestMapping(value = "refresh", method = RequestMethod.GET)
    public ResponseEntity<?> authenticationRequest(HttpServletRequest request) {
        String token = request.getHeader(AppConstant.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(token);
        SpringSecurityUser user = (SpringSecurityUser) this.userDetailsService.loadUserByUsername(username);
        if (this.tokenUtils.canTokenBeRefreshed(token, user.getLastPasswordReset())) {
            String refreshedToken = this.tokenUtils.refreshToken(token);
            return ResponseEntity.ok(new AuthenticationResponse(refreshedToken));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
