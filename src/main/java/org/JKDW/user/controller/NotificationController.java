package org.JKDW.user.controller;

import org.JKDW.security.TokenUtils;
import org.JKDW.user.model.Notification;
import org.JKDW.user.service.NotificationService;
import org.JKDW.user.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private TokenUtils tokenUtils;


    @RequestMapping(value = "/myNotifications", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<Notification>> getAllOfMyNotifications(HttpServletRequest request, Pageable pageable) {
        Page<Notification> myReceivedNotifications = notificationService.getMyAllNotificationsByPage(UserAccountService.getMyUsernameFromToken(request, this.tokenUtils), pageable);
        return new ResponseEntity<>(myReceivedNotifications, HttpStatus.OK);
    }


    @RequestMapping(value = "/myNotifications/{idNotification}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Notification> getNotificationById(@PathVariable("idNotification") Long idNotification, HttpServletRequest request) {
        Notification notification = notificationService.getMyNotificationById(idNotification);
        if (UserAccountService.getMyUsernameFromToken(request, this.tokenUtils).equals(notification.getRecipient().getUsername()))
            return new ResponseEntity<>(notification, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
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
