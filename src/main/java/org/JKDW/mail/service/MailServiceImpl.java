package org.JKDW.mail.service;

import org.JKDW.user.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    public JavaMailSender emailSender;

    @Autowired
    public UserAccountService userAccountService;

    /**
     * Creates and sends simple email without attachements
     * @param to email
     * @param subject
     * @param text
     */
    public void sendSimpleMessage(
            String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public void sendSimpleMessageFromUser(String username_sender, String to, String subject, String text) throws NoResultException{

      String nick_sender = userAccountService.getMyNickByToken(username_sender);
      if(nick_sender == null)
          throw new NoResultException("This user doesn't exist. ");

      SimpleMailMessage message = new SimpleMailMessage();
      message.setTo(to);
      message.setSubject(subject);
      message.setText("Wiadomość wysłana przez: "+ nick_sender + " \n" +  text);
      emailSender.send(message);
    }
}
