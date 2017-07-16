package org.JKDW.user.service;


import org.JKDW.user.model.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.NoResultException;
import java.util.List;

public interface NotificationService {

    Notification sendNotification(String contentOfNotification, String recipient_nick) throws NoResultException;

    Page<Notification> getMyAllNotificationsByPage(String recipient_username, Pageable pageable);

    void deleteMyNotification(Long idNotification, String usernameFromToken )throws NoResultException;

    int countNumberOfUnreadNotifications(String usernameFromToken);

}
