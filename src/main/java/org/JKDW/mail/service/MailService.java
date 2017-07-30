package org.JKDW.mail.service;

import javax.persistence.NoResultException;

public interface MailService {

    void sendSimpleMessage(String to, String subject, String text);

    void sendSimpleMessageFromUser(String username_sender, String to, String subject, String text) throws NoResultException;
}
