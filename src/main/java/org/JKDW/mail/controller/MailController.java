package org.JKDW.mail.controller;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.JKDW.mail.DTO.MailDTO;
import org.JKDW.mail.service.MailService;
import org.JKDW.security.TokenUtils;
import org.JKDW.user.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping(value = "/api/mail")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MailController {

    private final @NonNull MailService mailService;

    private final @NotNull TokenUtils tokenUtils;


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

    @RequestMapping(
            value = "/support/send",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    private ResponseEntity<Boolean> sendEmailFromUser(@RequestBody MailDTO mailDTO,
                                                      HttpServletRequest request){
        mailDTO.setEmail("borucharek666@gmail.com");
        mailService.sendSimpleMessageFromUser(UserAccountService.getMyUsernameFromToken(request, tokenUtils ),mailDTO.getEmail(),mailDTO.getTitle(),mailDTO.getContent());
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
