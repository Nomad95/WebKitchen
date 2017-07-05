package org.JKDW.user.service;


import org.JKDW.user.model.Message;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.repository.MessageRepository;
import org.JKDW.user.repository.UserAccountRepository;
import org.JKDW.websocket.service.WebSocketService;
import org.JKDW.websocket.model.Shout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;
import javax.sql.DataSource;
import javax.transaction.Transactional;
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

    @Autowired
    private WebSocketService webSocketService;


    @Override
    public Message sendMessage(Message message, String sender_username, String recipient_nick) throws NoResultException {
        UserAccount sender = userAccountRepository.findByUsername(sender_username);
        UserAccount recipient = userAccountRepository.findByNick(recipient_nick);
        Date date = new Date();

        if(sender == null )
            throw new NoResultException("Sender doeasn't exist");
        else if( recipient == null)
            throw new NoResultException("Recipient doesn'n exist");
        message.setSender(sender);
        message.setRecipient(recipient);
        message.setDateOfSend(date);
        message.setWasRead(false);
        message.setNickRecipient(recipient.getNick());
        message.setNickSender(sender.getNick());

        messageRepository.save(message);

        webSocketService.sendNotificationToUser(recipient_nick, new Shout("newMessage"));
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
        myMessagesToReceived.sort((message, message2) ->message2.getDateOfSend().compareTo(message.getDateOfSend()));

        return myMessagesToReceived;
    }

    @Override
    public Message getReceivedMessageById(Long id){
        Message message = messageRepository.findOne(id);
        if(message == null)
            throw new NoResultException("This message doesn't exist");
        if(!message.getWasRead()){
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            this.setMessageToRead(jdbcTemplate, id);
        }
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
        mySentMessage.sort((message, message2) ->message2.getDateOfSend().compareTo(message.getDateOfSend()));

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

    @Override
    @Transactional
    public int countNumberOfUnreadMessages(String usernameFromToken) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        UserAccount userAccount = userAccountRepository.findByUsername(usernameFromToken);
        Long id = userAccount.getId();
        String sql = "SELECT count(*) FROM message WHERE recipient = ? AND was_read=FALSE ";

        int count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count;
    }

    @Transactional
    public void updateSenderColumn(JdbcTemplate jdbcTemplate, String sender_username, Long idUser) {
        jdbcTemplate.update(
                "update message set sender = ? where id = ?",
                sender_username, idUser);
    }

    @Transactional
    public void updateRecipientColumn(JdbcTemplate jdbcTemplate, String recipient_username, Long idUser) {
        jdbcTemplate.update(
                "update message set recipient = ? where id = ?",
                recipient_username, idUser);
    }

    @Transactional
    public void setMessageToRead(JdbcTemplate jdbcTemplate,  Long idUser) {
        jdbcTemplate.update(
                "update message set was_read = TRUE where id = ?", idUser);
    }

}