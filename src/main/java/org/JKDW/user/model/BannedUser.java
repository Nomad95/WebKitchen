package org.JKDW.user.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity(name = "banned_user")
public class BannedUser {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @OneToOne
    @JoinColumn(name = "userAccount_id")
    @JsonIgnore
    private UserAccount userAccount;

    private Date dateEndOfBan;

    private Time timeEndOfBan;

    public Long getId() {
        return Id;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public Date getDateEndOfBan() {
        return dateEndOfBan;
    }

    public void setDateEndOfBan(Date dateEndOfBan) {
        this.dateEndOfBan = dateEndOfBan;
    }

    public Time getTimeEndOfBan() {
        return timeEndOfBan;
    }

    public void setTimeEndOfBan(Time timeEndOfBan) {
        this.timeEndOfBan = timeEndOfBan;
    }
}
