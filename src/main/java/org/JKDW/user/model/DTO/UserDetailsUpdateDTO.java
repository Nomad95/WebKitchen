package org.JKDW.user.model.DTO;

import org.JKDW.user.model.Cuisines;

import java.util.Date;
import java.util.List;


public class UserDetailsUpdateDTO {

	private Long Id;

	private String name;

	private String surname;

	private String street;

	private Integer streetNumber;

	private Integer flatNumber;

	private String postCode;

	private String city;

	private Date birthDate;

	private String phoneNumber;

	private Character sex;

	private String interests;

	private String description;

	private List<Cuisines> preferredCuisine;

	private Integer profileCompletion;

    private UserAccountDTO userAccountDTO;
    
    public UserDetailsUpdateDTO(){}
    
	public UserDetailsUpdateDTO(Long id, String name, String surname, String street, Integer streetNumber,
                                Integer flatNumber, String postCode, String city, Date birthDate, String phoneNumber, Character sex,
                                String interests, String description, List<Cuisines> preferredCuisine, Integer profileCompletion,
                                UserAccountDTO userAccountDTO) {
		this.Id = id;
		this.name = name;
		this.surname = surname;
		this.street = street;
		this.streetNumber = streetNumber;
		this.flatNumber = flatNumber;
		this.postCode = postCode;
		this.city = city;
		this.birthDate = birthDate;
		this.phoneNumber = phoneNumber;
		this.sex = sex;
		this.interests = interests;
		this.description = description;
		this.preferredCuisine = preferredCuisine;
		this.profileCompletion = profileCompletion;
		this.userAccountDTO = userAccountDTO;
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

	public List<Cuisines> getPreferredCuisine() {
		return preferredCuisine;
	}

	public void setPreferredCuisine(List<Cuisines> preferredCuisine) {
		this.preferredCuisine = preferredCuisine;
	}

	public Integer getProfileCompletion() {
		return profileCompletion;
	}

	public void setProfileCompletion(Integer profileCompletion) {
		this.profileCompletion = profileCompletion;
	}

	public UserAccountDTO getUserAccountDTO() {
		return userAccountDTO;
	}

	public void setUserAccountDTO(UserAccountDTO userAccountDTO) {
		this.userAccountDTO = userAccountDTO;
	}

    

}
