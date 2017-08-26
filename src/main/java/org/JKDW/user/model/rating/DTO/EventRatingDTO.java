package org.JKDW.user.model.rating.DTO;

import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class EventRatingDTO {

    private long id;

    private String title;

    private Time time;

    private Date date;

    private String dish_name;

    private int ownerId;

    private String ownerNick;

    private boolean hasEnded;
}
