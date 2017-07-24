package org.JKDW.mail.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.JKDW.mail.DTO.MailDTO;
import org.JKDW.mail.service.MailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/mail")
@RequiredArgsConstructor
public class MailController {

    private final @NonNull MailService mailService;

    /**
     * Example method that sends simple email
     * @return true if email was sent
     */
    @RequestMapping(
            value = "/send",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<Boolean> sendEmail(@RequestBody MailDTO mailDTO){
        mailService.sendSimpleMessage(mailDTO.getEmail(),mailDTO.getTitle(),mailDTO.getContent());
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
