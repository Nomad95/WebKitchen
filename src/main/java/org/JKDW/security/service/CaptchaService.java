package org.JKDW.security.service;

import org.JKDW.security.model.CaptchaRequest;

public interface CaptchaService {

    Boolean verify(CaptchaRequest captchaRequest);
}
