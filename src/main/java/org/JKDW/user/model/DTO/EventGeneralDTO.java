package org.JKDW.user.model.DTO;

import org.JKDW.user.model.DishKindEnum;

import java.sql.Time;
import java.util.Date;

public class EventGeneralDTO {

    private long id;

    private byte type;

    private String title;

    private Time time;

    private Date date;

    private String dish_name;

    private DishKindEnum dish_kind;

    private byte people_quantity;

    private int people_remaining;

    public EventGeneralDTO(long id, byte type, String title, Time time,
                           Date date, DishKindEnum dish_kind, String dish_name,
                           byte people_quantity, int people_remaining) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.time = time;
        this.date = date;
        this.dish_kind = dish_kind;
        this.dish_name = dish_name;
        this.people_quantity = people_quantity;
        this.people_remaining = people_remaining;
    }

    public int getPeople_remaining() {
        return people_remaining;
    }

    public void setPeople_remaining(int people_remaining) {
        this.people_remaining = people_remaining;
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
}