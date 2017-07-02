package org.JKDW.websocket.Service;

import org.JKDW.websocket.model.Shout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class WebSocketServiceImpl implements WebSocketService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Override
    @Scheduled(fixedDelay = 2000)
    public void sendMessageByStomp(Shout notification) {
        simpMessagingTemplate
                .convertAndSend("/topic/notification", notification);

    }
}
