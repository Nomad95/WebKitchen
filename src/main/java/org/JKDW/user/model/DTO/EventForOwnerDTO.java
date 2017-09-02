package org.JKDW.user.model.DTO;

import lombok.Data;
import org.JKDW.user.model.DishKindEnum;

import java.util.Date;
import java.util.List;

/**
 * Data Transfer Object providing general information od events and participants.
 * Used in profile event list
 */
@Data
public class EventForOwnerDTO {

    private long id;

    private byte type;

    private String title;

    private Date date;

    private String dish_name;

    private DishKindEnum dish_kind;

    private byte people_quantity;

    private int people_remaining;

    private Long ownerId;

    private long[] acceptedIds;

    private boolean hasEnded;

    private List<UserAccountForEventOwnerDTO> participantsDetails;

    public EventForOwnerDTO(){
    }

    public EventForOwnerDTO(long id,
                            byte type,
                            String title,
                            Date date,
                            String dish_name,
                            DishKindEnum dish_kind,
                            byte people_quantity,
                            int people_remaining,
                            long[] acceptedIds,
                            List<UserAccountForEventOwnerDTO> participantsDetails,
                            long ownerId) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.date = date;
        this.dish_name = dish_name;
        this.dish_kind = dish_kind;
        this.people_quantity = people_quantity;
        this.people_remaining = people_remaining;
        this.participantsDetails = participantsDetails;
        this.acceptedIds = acceptedIds;
        this.ownerId = ownerId;
        Date now = new Date();
        this.hasEnded = now.after(date);
    }
}
