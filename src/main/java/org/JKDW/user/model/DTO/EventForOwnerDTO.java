package org.JKDW.user.model.DTO;

import org.JKDW.user.model.DishKindEnum;

import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Data Transfer Object providing general information od events and participants.
 * Used in profile event list
 */
public class EventForOwnerDTO {

    private long id;

    private byte type;

    private String title;

    private Date date;

    private String dish_name;

    private DishKindEnum dish_kind;

    private byte people_quantity;

    private int people_remaining;

    private long[] acceptedIds;

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
                            List<UserAccountForEventOwnerDTO> participantsDetails) {
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
    }

    public long[] getAcceptedIds() {
        return acceptedIds;
    }

    public void setAcceptedIds(long[] acceptedIds) {
        this.acceptedIds = acceptedIds;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public byte getType() {
        return type;
    }

    public void setType(byte type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDish_name() {
        return dish_name;
    }

    public void setDish_name(String dish_name) {
        this.dish_name = dish_name;
    }

    public DishKindEnum getDish_kind() {
        return dish_kind;
    }

    public void setDish_kind(DishKindEnum dish_kind) {
        this.dish_kind = dish_kind;
    }

    public byte getPeople_quantity() {
        return people_quantity;
    }

    public void setPeople_quantity(byte people_quantity) {
        this.people_quantity = people_quantity;
    }

    public int getPeople_remaining() {
        return people_remaining;
    }

    public void setPeople_remaining(int people_remaining) {
        this.people_remaining = people_remaining;
    }

    public List<UserAccountForEventOwnerDTO> getParticipantsDetails() {
        return participantsDetails;
    }

    public void setParticipantsDetails(List<UserAccountForEventOwnerDTO> participantsDetails) {
        this.participantsDetails = participantsDetails;
    }
}
