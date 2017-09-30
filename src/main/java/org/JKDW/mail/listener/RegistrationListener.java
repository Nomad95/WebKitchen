package org.JKDW.mail.listener;

import org.JKDW.mail.event.OnRegistrationCompleteEvent;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RegistrationListener implements
        ApplicationListener<OnRegistrationCompleteEvent> {

    @Autowired
    private UserAccountService userAccountService;

    @Autowired
    private JavaMailSender mailSender;

    private String hostAddress = null;

    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }

    /**
     * Recieve emitted event, create token and send activation email
     */
    private void confirmRegistration(OnRegistrationCompleteEvent event) {
        UserAccount user = event.getUserAccount();
        String token = UUID.randomUUID().toString();
        userAccountService.createVerificationToken(user, token);

        String recipientAddress = user.getEmail();
        String subject = "Potwierdzenie rejestracji";
        //TODO: change this after deployment
        String confirmationUrl
                = event.getAppUrl() + "/#/registration/confirm?token=" + token;
        String message = makeTemplateMessage();

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(message + "\n" + confirmationUrl);
        mailSender.send(email);
    }

    /**
     * @return Template message that is written to email text
     */
    private String makeTemplateMessage(){
        return "Dziękujemy za rejestrację w serwisie Kuchnia po sąsiedzku!\n" +
                "Aby aktywować konto, prosimy o kliknięcie w poniższy link.\n\n";
    }

    public void setHostAddress(String hostAddress) {
        this.hostAddress = hostAddress;
    }
}
