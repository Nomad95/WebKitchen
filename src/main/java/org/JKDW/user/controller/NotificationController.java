package org.JKDW.user.controller;

import org.JKDW.security.TokenUtils;
import org.JKDW.user.model.DTO.NotificationDTO;
import org.JKDW.user.model.Message;
import org.JKDW.user.model.Notification;
import org.JKDW.user.service.NotificationService;
import org.JKDW.user.service.UserAccountService;
import org.JKDW.websocket.model.Shout;
import org.JKDW.websocket.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.NotNull;


@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    private final @NotNull NotificationService notificationService;
    private final @NotNull TokenUtils tokenUtils;
    private final @NotNull WebSocketService webSocketService;

    @Autowired
    public NotificationController(NotificationService notificationService, TokenUtils tokenUtils, WebSocketService webSocketService) {
        this.notificationService = notificationService;
        this.tokenUtils = tokenUtils;
        this.webSocketService = webSocketService;
    }

    @RequestMapping(value = "/myNotifications", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<Notification>> getAllOfMyNotifications(HttpServletRequest request, Pageable pageable) {
        Page<Notification> myReceivedNotifications = notificationService.getMyAllNotificationsByPage(UserAccountService.getMyUsernameFromToken(request, this.tokenUtils), pageable);
        return new ResponseEntity<>(myReceivedNotifications, HttpStatus.OK);
    }

    @RequestMapping(
            value = "/send/{recipient_nick}", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> notifyUser(@RequestBody NotificationDTO notificationDTO,
                                              @PathVariable("recipient_nick") String recipient_nick) {
        try {
            notificationService.sendNotification(notificationDTO.getContentOfNotification(),recipient_nick);
            webSocketService.sendNotificationToUser(recipient_nick, new Shout("NewNotification"));
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (NoResultException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/myNotifications/{idNotification}", method = RequestMethod.DELETE)
    public ResponseEntity deleteNotification(@PathVariable("idNotification") Long idNotification,
                                                HttpServletRequest request) {
        String usernameFromToken = UserAccountService.getMyUsernameFromToken(request, this.tokenUtils);
        try {
            notificationService.deleteMyNotification(idNotification, usernameFromToken);
            return new ResponseEntity(HttpStatus.OK);
        } catch (NoResultException e) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @RequestMapping(value = "/myNotifications/quantity/unread", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getNumberOfUnreadNotifications(HttpServletRequest request) {
        String usernameFromToken = UserAccountService.getMyUsernameFromToken(request, this.tokenUtils);
        int count = notificationService.countNumberOfUnreadNotifications(usernameFromToken);
        return new ResponseEntity<>("{\"count\": \" " + count + "\"}", HttpStatus.OK);
    }

}
