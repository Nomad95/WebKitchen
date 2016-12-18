package org.JKDW.user.model;

import java.util.Date;

import javax.persistence.*;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
@Entity
public class UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@NotNull
	@Size(min = 3, max = 25)
	private String name;
	
	@NotNull
	@Size(min = 3, max = 25)
	private String surname;
	

	@Size(min = 3, max = 45)
	private String street;
	
	private int streetNumber;
	private int flatNumber;
	
	@Size(min = 4, max = 10)
	private String postCode;
	
	@Size(min = 3, max = 45)
	private String city;
	
	private Date birthDate;
	
	@Size(min = 6, max = 15)
	private String phoneNumber;
	
	@Size(max = 1)
	private char sex;
	
	@Size(max = 255)
	private String interests;
	
	@Lob @Column( name = "description" )
	private byte[] description;
	
	@Lob @Column( name = "photo" )
	private byte[] photo;
	
	private int profileCompletion;
	
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "user_account_Id")
    private UserAccount userAccount;

	public UserDetails(){
		
	}

	public Long getId() {
		return Id;
	}


	public void setId(Long id) {
		Id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getSurname() {
		return surname;
	}


	public void setSurname(String surname) {
		this.surname = surname;
	}


	public String getStreet() {
		return street;
	}


	public void setStreet(String street) {
		this.street = street;
	}


	public int getStreetNumber() {
		return streetNumber;
	}


	public void setStreetNumber(int streetNumber) {
		this.streetNumber = streetNumber;
	}


	public int getFlatNumber() {
		return flatNumber;
	}


	public void setFlatNumber(int flatNumber) {
		this.flatNumber = flatNumber;
	}


	public String getPostCode() {
		return postCode;
	}


	public void setPostCode(String postCode) {
		this.postCode = postCode;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public Date getBirthDate() {
		return birthDate;
	}


	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}


	public String getPhoneNumber() {
		return phoneNumber;
	}


	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}


	public char getSex() {
		return sex;
	}


	public void setSex(char sex) {
		this.sex = sex;
	}


	public String getInterests() {
		return interests;
	}


	public void setInterests(String interests) {
		this.interests = interests;
	}


	public byte[] getDescription() {
		return description;
	}


	public void setDescription(byte[] description) {
		this.description = description;
	}


	public byte[] getPhoto() {
		return photo;
	}


	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}


	public int getProfileCompletion() {
		return profileCompletion;
	}


	public void setProfileCompletion(int profileCompletion) {
		this.profileCompletion = profileCompletion;
	}


	public UserAccount getUserAccount() {
		return userAccount;
	}


	public void setUserAccount(UserAccount userAccount) {
		this.userAccount = userAccount;
	}
	
}