package org.JKDW.user.model.DTO;

import java.sql.Time;
import java.util.Date;

public class UsersParticipationEventDTO {

    private Long id;

    private String title;

    private String dish_name;

    private byte type;

    private Time time;

    private Date date;

    private boolean isAccepted;

    private Long ownerId;

    private boolean hasEnded;

    //id of user quering this data
    private Long userId;

    public UsersParticipationEventDTO(
            Long id, String title, String dish_name,
            byte type, Time time, Date date, boolean isAccepted,
            Long ownerId,Long userId) {
        this.id = id;
        this.title = title;
        this.dish_name = dish_name;
        this.type = type;
        this.time = time;
        this.date = date;
        this.isAccepted = isAccepted;
        this.ownerId = ownerId;
        Date now = new Date();
        this.hasEnded = now.after(date);
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public boolean isHasEnded() {
        return hasEnded;
    }

    public void setHasEnded(boolean hasEnded) {
        this.hasEnded = hasEnded;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public boolean isAccepted() {
        return isAccepted;
    }

    public void setAccepted(boolean accepted) {
        isAccepted = accepted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDish_name() {
        return dish_name;
    }

    public void setDish_name(String dish_name) {
        this.dish_name = dish_name;
    }

    public byte getType() {
        return type;
    }

    public void setType(byte type) {
        this.type = type;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
