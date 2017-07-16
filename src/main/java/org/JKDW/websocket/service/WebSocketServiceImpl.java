package org.JKDW.websocket.service;

import org.JKDW.websocket.model.Shout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class WebSocketServiceImpl implements WebSocketService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    /**
     * We send a message with about type of notification
     * @param nick
     * @param notification can has form: "newMessage" , "newNotification", "ban"
     */
    @Override
    @Scheduled(fixedDelay = 5000)
    public void sendNotificationToUser(String nick, Shout notification) {
        simpMessagingTemplate
                .convertAndSend("/topic/notification/"+nick, notification);

    }
}
