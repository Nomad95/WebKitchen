package org.JKDW.security.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("protected")
public class ProtectedController {

    /**
     * Metoda testowa sprawdzająca czy token zawiera poprawne dane. Przy poprawnym działaniu gdy użytkkownik ma role USER
     * powinien dostać zwrotny message "Acces Denied". Jeśli jest adminem to powinno się wyświetlić String z metody
     */
    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getDaHoney() {
        return ResponseEntity.ok("{\"success\":true}");
    }
}
