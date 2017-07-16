package org.JKDW.user.service;

import org.JKDW.user.model.Notification;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.repository.NotificationRepository;
import org.JKDW.user.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;
import javax.sql.DataSource;
import javax.transaction.Transactional;
import java.util.Date;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private DataSource dataSource;

    @Override
    public Notification sendNotification(String contentOfNotification, String recipient_nick) throws NoResultException{
        UserAccount recipient = userAccountRepository.findByNick(recipient_nick);
        if(recipient == null)
            throw new NoResultException("User doesn't exist");
        Notification notification = new Notification();
        notification.setContent(contentOfNotification);
        notification.setRecipient(recipient);
        notification.setDateOfSend(new Date());
        notification.setWasRead(false);

        notificationRepository.save(notification);

        return notification;
    }

    @Override
    public Page<Notification> getMyAllNotificationsByPage(String recipient_username, Pageable pageable){

        UserAccount recipient = userAccountRepository.findByUsername(recipient_username);
        if(recipient== null)
            throw new NoResultException("This recipient doesn't exist");

        Page<Notification> myNotifications = notificationRepository.findNotificationByRecipientOrderByDateOfSendDesc(recipient,pageable);
        if(myNotifications == null)
            throw new NoResultException("This user hasn't any notification");

        return  myNotifications;
    }

    @Override
    public Notification getMyNotificationById(Long id) throws NoResultException {
        Notification notification = notificationRepository.findOne(id);
        if(notification == null)
            throw new NoResultException("This notification doesn't exist or is not yours");
        else if(!notification.getWasRead()){
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            setNotificationToRead(jdbcTemplate, id);
            notification.setWasRead(true);
        }

        return notification;
    }

    @Override
    public void deleteMyNotification(Long idNotification, String usernameFromToken ) throws NoResultException {
     Notification notification = notificationRepository.findOne(idNotification);
     String usernameSender = notification.getRecipient().getUsername();
     if(notification == null || !(usernameSender.equals(usernameFromToken)))
         throw new NoResultException("This notification doesn't exist or is not yours");
     notificationRepository.delete(idNotification);

    }

    @Override
    @Transactional
    public int countNumberOfUnreadNotifications(String usernameFromToken) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        UserAccount userAccount = userAccountRepository.findByUsername(usernameFromToken);
        Long id = userAccount.getId();
        String sql = "SELECT count(*) FROM notification WHERE recipient_id = ? AND was_read=FALSE ";

        int count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count;
    }

    @Transactional
    public void setNotificationToRead(JdbcTemplate jdbcTemplate, Long idUser) {
        jdbcTemplate.update(
                "update notification set was_read = TRUE where id = ?", idUser);
    }

}
