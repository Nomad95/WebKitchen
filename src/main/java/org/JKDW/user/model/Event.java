package org.JKDW.user.model;

import org.hibernate.annotations.Type;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity(name = "event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * title
     */
    @Size(min = 1)
    private String title;

    /**
     * type of event
     * 0- uczta dla innych
     * 1- wspolne gotowanie
     */
    private byte type;

    /**
     * time of start
     */
    private Time time;

    /**
     * date of start
     */
    private Date date;

    /**
     * address where the dinner is served
     */
    @Size(max = 255)
    private String address;

    /**
     * name of dish
     */
    @Size(max = 100)
    private String dish_name;

    /**
     * kind of dish : Obiad, Kolacja etc
     */
    @Enumerated(EnumType.STRING)
    private DishKindEnum dish_kind;

    /**
     * max number of incoming people
     */
    private byte people_quantity;

    /**
     * additional info of event
     */
    @Size(max = 255)
    private String additional_info;

    /**
     * description of dish/event
     */
    @Lob
    @Column(name = "description")
    @Type(type = "org.hibernate.type.TextType")
    private String description;

    /**
     * link to photo
     */
    @Column(nullable = true)
    private String photo;


	/* below nullable fields for different types of events */


    /**
     * list of products to buy
     */
    @Lob
    @Column(name = "shopping_list", nullable = true)
    //throws an exception without @Type annotation
    @Type(type = "org.hibernate.type.TextType")
    private String shopping_list;

    /**
     * list of products held
     */
    @Lob
    @Column(name = "products_list", nullable = true)
    @Type(type = "org.hibernate.type.TextType")
    private String products_list;

    /**
     * a quantity of items every participant should bring
     */
    @Column(nullable = true)
    private byte quantity_of_products;

    /**
     * accounts of participants TODO: change UserDetails to UserAccount
     */
    @ManyToMany(mappedBy = "events")
    private List<UserDetails> accounts;

    public List<UserDetails> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<UserDetails> accounts) {
        this.accounts = accounts;
    }

    public byte getPeople_quantity() {
        return people_quantity;
    }

    public void setPeople_quantity(byte people_quantity) {
        this.people_quantity = people_quantity;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public byte getPeople_quanity() {
        return people_quantity;
    }

    public void setPeople_quanity(byte people_quanity) {
        this.people_quantity = people_quanity;
    }

    public String getAdditional_info() {
        return additional_info;
    }

    public void setAdditional_info(String additional_info) {
        this.additional_info = additional_info;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getShopping_list() {
        return shopping_list;
    }

    public void setShopping_list(String shopping_list) {
        this.shopping_list = shopping_list;
    }

    public String getProducts_list() {
        return products_list;
    }

    public void setProducts_list(String products_list) {
        this.products_list = products_list;
    }

    public byte getQuantity_of_products() {
        return quantity_of_products;
    }

    public void setQuantity_of_products(byte quantity_of_products) {
        this.quantity_of_products = quantity_of_products;
    }


}
