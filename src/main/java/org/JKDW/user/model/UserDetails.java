package org.JKDW.user.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.Size;

import org.JKDW.user.model.DTO.UserAccountDTO;
import org.JKDW.user.model.DTO.UserDetailsUpdateDTO;

/**
 * We have to use Integer class instead of int
 * because simple types cannot be null
 *
 */
@Entity (name = "user_details")
public class UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;

	@Size(min = 3, max = 25)
	private String name;

	@Size(min = 3, max = 25)
	private String surname;

	@Size(min = 3, max = 45)
	private String street;

	@Column(nullable=true)
	private Integer streetNumber;

	@Column(nullable=true)
	private Integer flatNumber;

	@Size(min = 4, max = 10)
	@Column(nullable=true)
	private String postCode;

	@Size(min = 3, max = 45)
	private String city;

	private Date birthDate;

	@Size(min = 6, max = 15)
	@Column(nullable=true)
	private String phoneNumber;

	@Column(nullable=true)
	private Character sex;

	@Size(max = 255)
	private String interests;

	@Lob @Column( name = "description" )
	private String description;

	@Lob @Column( name = "photo" )
	private byte[] photo;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "userDetails_cuisine", joinColumns = {
			@JoinColumn(name = "userDetails_ID", nullable = false, updatable = false) },
			inverseJoinColumns = { @JoinColumn(name = "cuisine_ID",
					nullable = false, updatable = false) })
	private List<Cuisines> preferredCuisine = new ArrayList<Cuisines>();

	private Integer profileCompletion;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "user_account_Id")
    private UserAccount userAccount;

	@ManyToMany
	private List<Event> events;

//	private UserAccountDTO userAccountDTO;

	public UserDetails(){

	}

	public UserDetails(UserDetailsUpdateDTO userDetailsUpdateDTO){
		this.name = userDetailsUpdateDTO.getName();
		this.surname = userDetailsUpdateDTO.getSurname();
		this.street = userDetailsUpdateDTO.getStreet();
		this.streetNumber = userDetailsUpdateDTO.getStreetNumber();
		this.flatNumber = userDetailsUpdateDTO.getFlatNumber();
		this.postCode = userDetailsUpdateDTO.getPostCode();
		this.city = userDetailsUpdateDTO.getCity();
		this.birthDate = userDetailsUpdateDTO.getBirthDate();
		this.phoneNumber = userDetailsUpdateDTO.getPhoneNumber();
		this.sex = userDetailsUpdateDTO.getSex();
		this.interests = userDetailsUpdateDTO.getInterests();
		this.description = userDetailsUpdateDTO.getDescription();
		this.preferredCuisine = userDetailsUpdateDTO.getPreferredCuisine();
		this.profileCompletion = userDetailsUpdateDTO.getProfileCompletion();
	//	this.userAccountDTO = userDetailsUpdateDTO.getUserAccountDTO();
	}
	//
	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
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


	public Integer getStreetNumber() {
		return streetNumber;
	}


	public void setStreetNumber(Integer streetNumber) {
		this.streetNumber = streetNumber;
	}


	public Integer getFlatNumber() {
		return flatNumber;
	}


	public void setFlatNumber(Integer flatNumber) {
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


	public Character getSex() {
		return sex;
	}


	public void setSex(Character sex) {
		this.sex = sex;
	}


	public String getInterests() {
		return interests;
	}


	public void setInterests(String interests) {
		this.interests = interests;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public byte[] getPhoto() {
		return photo;
	}


	public void setPhoto(byte[] photo) {
		this.photo = photo;
	}


	public Integer getProfileCompletion() {
		return profileCompletion;
	}


	public void setProfileCompletion(Integer profileCompletion) {
		this.profileCompletion = profileCompletion;
	}


	public UserAccount getUserAccount() {
		return userAccount;
	}


	public void setUserAccount(UserAccount userAccount) {
		this.userAccount = userAccount;
	}

	public void setUserAccountDTO(UserAccountDTO userAccountDTO) {
		// TODO Auto-generated method stub
		
	}

	public List<Cuisines> getPreferredCuisine() {
		return preferredCuisine;
	}

	public void setPreferredCuisine(List<Cuisines> preferredCuisine) {
		this.preferredCuisine = preferredCuisine;
	}
	

}
