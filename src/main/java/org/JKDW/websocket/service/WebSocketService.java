package org.JKDW.websocket.Service;

import org.JKDW.websocket.model.Shout;

public interface WebSocketService {

    void sendMessageByStomp(Shout notification);

}
