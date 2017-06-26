package org.JKDW.mail.service;

public interface MailService {

    void sendSimpleMessage(String to, String subject, String text);
}
