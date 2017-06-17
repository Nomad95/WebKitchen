package org.JKDW.user.model.DTO;

/**
 * Data Transfer Object providing general information about participant
 * Used in profile event list
 */
public class UserAccountForEventOwnerDTO {

    private Long id;

    private String username;

    private String nick;

    private Boolean isFilled;

    private Boolean isVerified;

    public UserAccountForEventOwnerDTO() {
    }

    public UserAccountForEventOwnerDTO(Long id, String username, String nick, Boolean isFilled, Boolean isVerified) {
        this.id = id;
        this.username = username;
        this.nick = nick;
        this.isFilled = isFilled;
        this.isVerified = isVerified;
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

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    public Boolean getFilled() {
        return isFilled;
    }

    public void setFilled(Boolean filled) {
        isFilled = filled;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }
}
