package org.JKDW.user.controller;

import org.JKDW.security.TokenUtils;
import org.JKDW.user.model.Message;
import org.JKDW.user.service.MessageService;
import org.JKDW.user.service.NotificationService;
import org.JKDW.user.service.UserAccountService;
import org.JKDW.websocket.model.Shout;
import org.JKDW.websocket.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private WebSocketService webSocketService;

    @RequestMapping(
            value = "/send/{recipient_nick}", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> sendMessageToUser(@RequestBody Message message,
                                                     HttpServletRequest request,
                                                     @PathVariable("recipient_nick") String recipient_nick) {
        try {
            Message messageToSend = messageService.sendMessage(message, UserAccountService.getMyUsernameFromToken(request, this.tokenUtils), recipient_nick);
            notificationService.sendNotification("Nowe powiadomienia", recipient_nick);
            webSocketService.sendNotificationToUser(recipient_nick, new Shout("newMessage"));
            webSocketService.sendNotificationToUser(recipient_nick, new Shout("newNotification"));

            return new ResponseEntity<>(messageToSend, HttpStatus.CREATED);
        } catch (NoResultException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @RequestMapping(value = "/myMessages/received", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Message>> getAllOfMyReceivedMessage(HttpServletRequest request) {
        List<Message> myReceivedMessages = messageService.getAllOfMyReceivedMessage(UserAccountService.getMyUsernameFromToken(request, this.tokenUtils));
        return new ResponseEntity<>(myReceivedMessages, HttpStatus.OK);
    }

    /**
     * The method contains a checks if the message is belongs to the user by compare username recipient
     * with username from token
     *
     * @param idMessage
     * @param request
     * @return
     */

    @RequestMapping(value = "/myMessages/received/{idMessage}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> getReceivedMessageById(@PathVariable("idMessage") Long idMessage, HttpServletRequest request) {
        Message message = messageService.getReceivedMessageById(idMessage);
        if (UserAccountService.getMyUsernameFromToken(request, this.tokenUtils).equals(message.getRecipient().getUsername()))
            return new ResponseEntity<>(message, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "/myMessages/sent", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Message>> getAllOfMySentMessage(HttpServletRequest request) {
        List<Message> mySentMessages = messageService.getAllOfMySentMessage(UserAccountService.getMyUsernameFromToken(request, this.tokenUtils));
        return new ResponseEntity<>(mySentMessages, HttpStatus.OK);
    }

    @RequestMapping(value = "/myMessages/sent/{idMessage}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> getSentMessageById(@PathVariable("idMessage") Long idMessage, HttpServletRequest request) {
        Message message = messageService.getSentMessageById(idMessage);
        if (UserAccountService.getMyUsernameFromToken(request, this.tokenUtils).equals(message.getSender().getUsername()))
            return new ResponseEntity<>(message, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @RequestMapping(value = "myMessages/received/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteMessageFromReceived(@PathVariable("id") Long id,
                                                    HttpServletRequest request) {

        String usernameFromToken = UserAccountService.getMyUsernameFromToken(request, this.tokenUtils);
        try {
            messageService.deleteMessageFromReceived(id, usernameFromToken);
            return new ResponseEntity(HttpStatus.OK);
        } catch (NoResultException e) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

    }

    @RequestMapping(value = "myMessages/sent/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteMessageFromSent(@PathVariable("id") Long id,
                                                HttpServletRequest request) {
        String usernameFromToken = UserAccountService.getMyUsernameFromToken(request, this.tokenUtils);
        try {
            messageService.deleteMessageFromSent(id, usernameFromToken);
            return new ResponseEntity(HttpStatus.OK);
        } catch (NoResultException e) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @RequestMapping(value = "/myMessages/received/quantity/unread", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getNumberOfUnreadMessage(HttpServletRequest request) {
        String usernameFromToken = UserAccountService.getMyUsernameFromToken(request, this.tokenUtils);
        int count = messageService.countNumberOfUnreadMessages(usernameFromToken);
        return new ResponseEntity<>("{\"count\": \" " + count + "\"}", HttpStatus.OK);
    }
}