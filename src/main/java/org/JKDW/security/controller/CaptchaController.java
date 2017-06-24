package org.JKDW.security.controller;

import org.JKDW.security.model.CaptchaRequest;
import org.JKDW.security.service.CaptchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/captcha")
public class CaptchaController {

    @Autowired
    private CaptchaService captchaService;

    @RequestMapping(value = "/verify", method = RequestMethod.POST)
    public ResponseEntity<Boolean> authenticationRequest(@RequestBody CaptchaRequest captchaRequest) {
        Boolean verify = captchaService.verify(captchaRequest);
        return new ResponseEntity<>(verify, HttpStatus.OK);
    }
}
