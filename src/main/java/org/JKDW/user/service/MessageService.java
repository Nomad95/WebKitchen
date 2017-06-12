package org.JKDW.user.service;


import org.JKDW.user.model.Message;

import javax.persistence.NoResultException;
import java.util.List;

public interface MessageService {

    Message sendMessage(Message message, String sender_username, String recipient_nick) throws NoResultException;

    List<Message> getAllOfMyReceivedMessage(String recipient_username) throws NoResultException;

    Message getReceivedMessageById(Long id) throws NoResultException;

    List<Message> getAllOfMySentMessage(String sender_username) throws NoResultException;

    Message getSentMessageById(Long id) throws NoResultException;

    void deleteMessageFromReceived(Long id, String usernameFromToken) throws NoResultException ;

    void deleteMessageFromSent(Long id, String usernameFromToken) throws NoResultException;

}
