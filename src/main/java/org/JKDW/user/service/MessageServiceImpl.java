package org.JKDW.user.service;


import org.JKDW.security.TokenUtils;
import org.JKDW.user.model.Message;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.repository.MessageRepository;
import org.JKDW.user.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;


    @Override
    public Message sendMessage(Message message, String sender_username, String recipient_username) throws NoResultException {
        UserAccount sender = userAccountRepository.findByUsername(sender_username);
        UserAccount recipient = userAccountRepository.findByUsername(recipient_username);
        Date date = new Date();

        if(sender == null )
            throw new NoResultException("Sender doeasn't exist");
        else if( recipient == null)
            throw new NoResultException("Recipient doesn'n exist");
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setDateOfSend(date);

        messageRepository.save(message);

        return message;
    }

    @Override
    public List<Message> getAllOfMyReceivedMessage(String recipient_username) throws NoResultException {

        UserAccount recipient = userAccountRepository.findByUsername(recipient_username);
        if(recipient== null)
            throw new NoResultException("This recipient doesn't exist");

        List<Message> myMessages = messageRepository.findByRecipient(recipient);
        if(myMessages == null)
            throw new NoResultException("This user hasn't any massage to received");

        return myMessages;
    }

    public Message getReceivedMessageById(Long id){
        Message message = messageRepository.findOne(id);
        return message;
    }
}
