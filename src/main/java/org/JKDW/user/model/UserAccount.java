package org.JKDW.user.model;

//import jdk.nashorn.internal.ir.annotations.Ignore;

import org.JKDW.user.model.DTO.UserAccountCreateDTO;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity(name = "user_account")
public class UserAccount {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long Id;

	@NotNull
	@Size(min = 4, max = 45)
	@Column(unique = true)
	private String username;

	@NotNull
	@Size(min = 6, max = 100)
	private String password;

	@NotNull
	@Size(min = 5, max = 45)
	@Column(unique = true)
	private String email;

	@NotNull
	@Size(min = 4, max = 45)
	private String country;

	@NotNull
	@Size(min = 4, max =25)
	@Column(unique = true)
	private String nick;

	private String authorities;

	@Column(name = "is_filled")
	private Boolean isFilled;

	@Column(name = "is_Verified")
	private Boolean isVerified;

	@Column(name = "created_at")
	private Date createdAt;

	@Column(name = "last_logged")
	private Date lastLogged;

	
	public UserAccount(){
	}

	public UserAccount(UserAccountCreateDTO userAccountCreateDTO) {
		this.username = userAccountCreateDTO.getUsername();
		this.password = userAccountCreateDTO.getPassword();
		this.email = userAccountCreateDTO.getE_mail();
		this.country = userAccountCreateDTO.getCountry();
		this.nick = userAccountCreateDTO.getNick();
	}
	
	//metoda wywolywana przy INSERTcie.
	@PrePersist
	protected void onCreate() {
		createdAt = new Date();
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getLastLogged() {
		return lastLogged;
	}

	public void setLastLogged(Date lastLogged) {
		this.lastLogged = lastLogged;
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
	public Long getId() {
		return Id;
	}
	public void setId(Long id) {
		Id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	public String getAuthorities() {
		return authorities;
	}
	public void setAuthorities(String authorities) {
		this.authorities = authorities;
	}
}
