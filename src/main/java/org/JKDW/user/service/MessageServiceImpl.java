package org.JKDW.user.service;


import org.JKDW.user.model.Message;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.repository.MessageRepository;
import org.JKDW.user.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;
import javax.sql.DataSource;
import java.util.Date;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private DataSource dataSource;


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

        List<Message> myMessagesToReceived = messageRepository.findByRecipient(recipient);
        if(myMessagesToReceived == null)
            throw new NoResultException("This user hasn't any massage to received");

        return myMessagesToReceived;
    }

    @Override
    public Message getReceivedMessageById(Long id){
        Message message = messageRepository.findOne(id);
        return message;
    }

    @Override
    public List<Message> getAllOfMySentMessage(String sender_username) throws NoResultException {

        UserAccount sender = userAccountRepository.findByUsername(sender_username);
        if(sender_username == null)
            throw new NoResultException("This user doesn't exist");

        List<Message> mySentMessage = messageRepository.findMessageBySender(sender);
        if(sender == null)
            throw new NoResultException("This user hasn't any sent massege ");

        return mySentMessage;
    }

    @Override
    public Message getSentMessageById(Long id) throws NoResultException {
        Message message = messageRepository.findOne(id);
        return message;
    }

    /**
     *  Method check if message is binded with sender in base.
     *  If yes, we can't delete message also we just delete binder to Recipient
     * @param idMessage
     * @throws NoResultException
     */
    @Override
    public void deleteMessageFromReceived(Long idMessage, String usernameFromToken) throws NoResultException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        Message messageToDelete = messageRepository.findOne(idMessage);
        String usernameRecipient = messageToDelete.getRecipient().getUsername();
        if(messageToDelete == null || !(usernameRecipient.equals(usernameFromToken)))
            throw new NoResultException("This message doesn't exist or action is unauthorized");
        else if(messageToDelete.getSender() != null)
            updateRecipientColumn(jdbcTemplate,null,idMessage);
        else
            messageRepository.delete(messageToDelete);
    }

    /**
     *  Method check if message is binded for someone in base.
     *  If yes can't delete message also we just delete binder to Sender
     * @param idMessage
     * @throws NoResultException
     */

    @Override
    public void deleteMessageFromSent(Long idMessage, String usernameFromToken) throws NoResultException {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        Message messageToDelete = messageRepository.findOne(idMessage);
        String usernameSender = messageToDelete.getSender().getUsername();
        if(messageToDelete == null || !(usernameSender.equals(usernameFromToken)))
            throw new NoResultException("This message doesn't exist or action is unauthorized");
        else if(messageToDelete.getRecipient() != null)
            updateSenderColumn(jdbcTemplate,null,idMessage);
        else
            messageRepository.delete(messageToDelete);
    }

    public void updateSenderColumn(JdbcTemplate jdbcTemplate, String sender_username, Long idUser) {
        jdbcTemplate.update(
                "update message set sender = ? where id = ?",
                sender_username, idUser);
    }

    public void updateRecipientColumn(JdbcTemplate jdbcTemplate, String recipient_username, Long idUser) {
        jdbcTemplate.update(
                "update message set recipient = ? where id = ?",
                recipient_username, idUser);
    }
}
