package org.JKDW.mail.controller;

import org.JKDW.mail.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/mail")
public class MailController {

    @Autowired
    private MailService mailService;

    /**
     * Example method that sends simple email
     * @return true if email was sent
     */
    @RequestMapping(value = "/send", method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<Boolean> sendEmail(){
        mailService.sendSimpleMessage("igokop9999@gmail.com","cos","asdasddd");
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
