package org.JKDW.user.model;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
public class UserAccount {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@NotNull
	@Size(min = 4, max = 45)
	private String login;
	
	@NotNull
	@Size(min = 6, max = 45)
	private String password;
	
	@NotNull
	@Size(min = 5, max = 45)
	private String e_mail;
	
	@NotNull
	@Size(min = 4, max = 45)
	private String country;
	
	@NotNull
	@Size(min = 4, max =25)
	private String nick;
	
	private Boolean isFilled;
	private Boolean isVerified;
	public Long getId() {
		return Id;
	}
	public void setId(Long id) {
		Id = id;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getE_mail() {
		return e_mail;
	}
	public void setE_mail(String e_mail) {
		this.e_mail = e_mail;
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

}
