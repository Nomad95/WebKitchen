package org.JKDW.user.model.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.JKDW.user.model.DishKindEnum;
import org.JKDW.user.model.Event;
import org.JKDW.user.model.UserAccount;

import java.sql.Time;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
public class EventWithOwnerDTO {
    private Long id;
    private String title;
    private byte type;
    private Time time;
    private Date date;
    private String address;
    private String dish_name;
    private DishKindEnum dish_kind;
    private byte people_quantity;
    private String additional_info;
    private Set<Long> acceptedIds;
    private String description;
    private String photo;
    private Long ownerId;
    private String shopping_list;
    private String products_list;
    private byte quantity_of_products;
    private Integer people_remaining;
    private String ownerUsername;
    private String ownerNick;
    private String ownerEmail;

    public EventWithOwnerDTO(Event event, UserAccount userAccount){
        this.id = event.getId();
        this.title = event.getTitle();
        this.type = event.getType();
        this.time = event.getTime();
        this.date = event.getDate();
        this.address = event.getAddress();
        this.dish_name = event.getDish_name();
        this.dish_kind = event.getDish_kind();
        this.people_quantity = event.getPeople_quantity();
        this.additional_info = event.getAdditional_info();
        this.acceptedIds = event.getAcceptedIds();
        this.description = event.getDescription();
        this.photo = event.getPhoto();
        this.ownerId = event.getOwnerId();
        this.shopping_list = event.getShopping_list();
        this.products_list = event.getProducts_list();
        this.quantity_of_products = event.getQuantity_of_products();
        this.people_remaining = event.getPeople_remaining();
        this.ownerUsername = userAccount.getUsername();
        this.ownerNick = userAccount.getNick();
        this.ownerEmail = userAccount.getEmail();
    }
}
