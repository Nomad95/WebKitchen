package org.JKDW.user.model.DTO;

import java.util.Date;

public class UserAccountDTO {

    private Long Id;

    private String username;

    private String email;

    private String country;

    private String nick;

    private Date lastLogged;
    
	private Boolean isFilled;

	private Boolean isVerified;

	private Date createdAt;

	
	public UserAccountDTO(){}
	
    public UserAccountDTO(Long id, String username, String email, String country, String nick, Date lastLogged,
			Boolean isFilled, Boolean isVerified, Date createdAt) {
		this.Id = id;
		this.username = username;
		this.email = email;
		this.country = country;
		this.nick = nick;
		this.lastLogged = lastLogged;
		this.isFilled = isFilled;
		this.isVerified = isVerified;
		this.createdAt = createdAt;
	}

	public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        this.Id = id;
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

	public Boolean getIsFilled() {
		return isFilled;
	}

	public void setIsFilled(Boolean isFilled) {
		this.isFilled = isFilled;
	}

	public Boolean getIsVerified() {
		return isVerified;
	}

	public void setIsVerified(Boolean isVerified) {
		this.isVerified = isVerified;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
    
}
