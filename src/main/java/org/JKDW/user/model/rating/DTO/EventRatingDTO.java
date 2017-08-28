package org.JKDW.user.model.rating.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.JKDW.user.model.Event;

import java.sql.Time;
import java.util.Date;

@Data
@AllArgsConstructor
public class EventRatingDTO {

    private long id;

    private String title;

    private Time time;

    private Date date;

    private String dish_name;

    private Long ownerId;

    private boolean hasEnded;

    public static EventRatingDTO fromEvent(Event event){
        return new EventRatingDTO(
                event.getId(),
                event.getTitle(),
                event.getTime(),
                event.getDate(),
                event.getDish_name(),
                event.getOwnerId(),
                new Date().after(event.getDate())
        );
    }
}
