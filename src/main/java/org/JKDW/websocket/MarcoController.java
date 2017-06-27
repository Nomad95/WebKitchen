package org.JKDW.websocket;

import org.JKDW.websocket.model.Shout;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MarcoController {

    private static final Logger logger = LoggerFactory.getLogger(MarcoController.class);

    public void handleShout(Shout incoming){
        logger.info("Odebrano komunikat: "+ incoming.getMessage());
    }
}
