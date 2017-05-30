package org.JKDW.user.model.DTO;

import java.util.Date;

public class UserAccountDTO {

    private Long id;

    private String username;

    private String email;

    private String country;

    private String nick;

    private Date lastLogged;

    public UserAccountDTO(Long id, String username, String email, String country, String nick, Date lastLogged) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.country = country;
        this.nick = nick;
        this.lastLogged = lastLogged;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public Date getLastLogged() {
        return lastLogged;
    }

    public void setLastLogged(Date lastLogged) {
        this.lastLogged = lastLogged;
    }
}
