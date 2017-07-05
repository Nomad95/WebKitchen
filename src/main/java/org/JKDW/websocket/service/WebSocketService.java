package org.JKDW.websocket.service;

import org.JKDW.websocket.model.Shout;

public interface WebSocketService {

    void sendNotificationToUser(String nick,Shout notification);

}
