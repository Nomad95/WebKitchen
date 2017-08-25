package org.JKDW.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.JKDW.user.model.DTO.UserAccountDTO;
import org.JKDW.user.model.DTO.UserDetailsUpdateDTO;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.sql.Blob;
import java.util.Date;
import java.util.List;

/**
 * We have to use Integer class instead of int
 * because simple types cannot be null
 *
 */
@Entity (name = "user_details")
public class UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long Id;

	@Pattern(regexp="^$|[A-Za-ząćęłńóśźżĄŚĆĘŁŹŻÓ]{3,25}")
	private String name;

	@Pattern(regexp="^$|[A-Za-ząćęłńóśźżĄŚĆĘŁŹŻÓ]{3,45}")
	private String surname;

	@Pattern(regexp="^$|[A-Za-ząćęłńóśźżĄŚĆĘŁŹŻÓ][a-zA-ZząćęłńóśźżĄŚĆĘŁŹŻÓ. ]{3,44}")
	private String street;

	/*@Column(nullable=true)
	@Pattern(regexp="^$|[1-9]{1,3}")*/
	@Column(nullable=true)
	@Range(min=1, max=999)
	private Integer streetNumber;

	@Column(nullable=true)
	@Range(min=1, max=999)
	private Integer flatNumber;

	@Pattern(regexp="^$|[0-9]{2}-[0-9]{3}")
	private String postCode;

	@Pattern(regexp="^$|[A-Za-ząćęłńóśźżĄŚĆĘŁŹŻÓ]{3,45}")
	private String city;

	private Date birthDate;

	@Size(max = 15)
	@Column(nullable=true)
	private String phoneNumber;

	@Column(nullable=true)
	private Character sex;

	@Size(max = 255)
	private String interests;

	@Column( name = "description" )
	private String description;

	@Lob @Column( name = "photo" )
	private Blob photo;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "userDetails_cuisine", joinColumns = {
			@JoinColumn(name = "userDetails_ID", nullable = false, updatable = false) },
			inverseJoinColumns = { @JoinColumn(name = "cuisine_ID",
					nullable = false, updatable = false) })
	private List<Cuisines> preferredCuisine;

	private Integer profileCompletion;

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	@JoinColumn(name = "user_account_Id")
	private UserAccount userAccount;

	@ManyToMany
	@JsonIgnore//prevents infinite loops i.e. when we get details about user
	private List<Event> events;

	public UserDetails(){}

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

	public Blob getPhoto() {
		return photo;
	}

	public void setPhoto(Blob photo) {
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
	}

	public List<Cuisines> getPreferredCuisine() {
		return preferredCuisine;
	}

	public void setPreferredCuisine(List<Cuisines> preferredCuisine) {
		this.preferredCuisine = preferredCuisine;
	}

	public void initProfileCompletionAtRegistration(){
		this.setProfileCompletion(1);
	}

	public void updateUserDetails(UserDetailsUpdateDTO userDetailsDTO){
		this.setId(userDetailsDTO.getId());
		this.setName(userDetailsDTO.getName());
		this.setSurname(userDetailsDTO.getSurname());
		this.setStreet(userDetailsDTO.getStreet());
		this.setStreetNumber(userDetailsDTO.getStreetNumber());
		this.setFlatNumber(userDetailsDTO.getFlatNumber());
		this.setPostCode(userDetailsDTO.getPostCode());
		this.setCity(userDetailsDTO.getCity());
		this.setBirthDate(userDetailsDTO.getBirthDate());
		this.setPhoneNumber(userDetailsDTO.getPhoneNumber());
		this.setSex(userDetailsDTO.getSex());
		this.setInterests(userDetailsDTO.getInterests());
		this.setDescription(userDetailsDTO.getDescription());
		this.setPreferredCuisine(userDetailsDTO.getPreferredCuisine());
		this.setProfileCompletion(userDetailsDTO.getProfileCompletion());

		this.getUserAccount().setId(userDetailsDTO.getUserAccountDTO().getId());
		this.getUserAccount().setUsername(userDetailsDTO.getUserAccountDTO().getUsername());
		this.getUserAccount().setEmail(userDetailsDTO.getUserAccountDTO().getEmail());
		this.getUserAccount().setCountry(userDetailsDTO.getUserAccountDTO().getCountry());
		this.getUserAccount().setLastLogged(userDetailsDTO.getUserAccountDTO().getLastLogged());
		this.getUserAccount().setIsFilled(userDetailsDTO.getUserAccountDTO().getIsFilled());
		this.getUserAccount().setIsVerified(userDetailsDTO.getUserAccountDTO().getIsVerified());
		this.getUserAccount().setCreatedAt(userDetailsDTO.getUserAccountDTO().getCreatedAt());
	}
}
