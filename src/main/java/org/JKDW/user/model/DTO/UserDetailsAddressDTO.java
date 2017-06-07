package org.JKDW.user.model.DTO;//parse("File Header.java")

import org.JKDW.user.model.Cuisines;

import java.util.Date;
import java.util.List;

public class UserDetailsAddressDTO {

        private Long id;

        private String street;

        private Integer streetNumber;

        private Integer flatNumber;

        private String city;

        public UserDetailsAddressDTO(){}

        public UserDetailsAddressDTO(Long id, String street, Integer streetNumber,
                                    Integer flatNumber, String city) {
            this.id = id;
            this.street = street;
            this.streetNumber = streetNumber;
            this.flatNumber = flatNumber;
            this.city = city;
        }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
