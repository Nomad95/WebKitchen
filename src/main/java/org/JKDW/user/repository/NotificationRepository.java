package org.JKDW.user.repository;

import org.JKDW.user.model.Notification;
import org.JKDW.user.model.UserAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long>,
        PagingAndSortingRepository<Notification, Long> {

    Page<Notification> findNotificationByRecipientOrderByDateOfSendDesc(UserAccount recipient, Pageable pageable);
}
