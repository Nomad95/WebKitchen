package org.JKDW.security.controller;

import org.JKDW.security.AppConstant;
import org.JKDW.security.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@RestController
@RequestMapping
public class ProtectedController {

    @Autowired
    TokenUtils tokenUtils;

    /**
     * Metoda testowa sprawdzająca czy token zawiera poprawne dane. Przy poprawnym działaniu gdy użytkkownik ma role USER
     * powinien dostać zwrotny message "Acces Denied". Jeśli jest adminem to powinno się wyświetlić String z metody
     */
    @RequestMapping(value = "protected" ,method = RequestMethod.GET)
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getDaHoney() {
        return ResponseEntity.ok("{\"success\":true}");
    }

    /**
     *  Metoda testowa zwracająca kto jest zalogowany i kiedy wygasa jego token
     */

    @RequestMapping(value = "me" , method = RequestMethod.GET)
    public String home(HttpServletRequest request){
        String token = request.getHeader(AppConstant.tokenHeader);
        String username = this.tokenUtils.getUsernameFromToken(token);
        Date expire = this.tokenUtils.getExpirationDateFromToken(token);
        return "Witaj " + username + " !!! \n"  + "Data wygaśnięcia:  " + expire;
    }
}
