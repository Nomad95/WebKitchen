package org.JKDW.security.service;

import org.JKDW.security.model.CaptchaRequest;
import org.JKDW.security.model.CaptchaResponse;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class CaptchaServiceImpl implements CaptchaService {

    /*
    secret key generated in google reCaptcha site. Do not use in frontend.
    Should be changed afred server deployment
     */
    private final static String SECRET = "6Le1ACYUAAAAAC--aIWFLLdV3ZhLIT8wD3-1c6iX";

    @Override
    public Boolean verify(CaptchaRequest captchaRequest) {
        //create multi value map to create request body
        MultiValueMap<String,String> varMap = new LinkedMultiValueMap<>();
        varMap.add("secret",SECRET);
        varMap.add("response",captchaRequest.getResponse());

        //create rest template and call POST on google uri
        RestTemplate restTemplate = new RestTemplate();
        CaptchaResponse response = restTemplate.postForEntity(
                "https://www.google.com/recaptcha/api/siteverify",
                varMap,
                CaptchaResponse.class
                ).getBody();

        return response.isSuccess();
    }
}
