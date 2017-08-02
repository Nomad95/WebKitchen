package org.JKDW.user.model.rating.DTO;

import lombok.Data;
import org.JKDW.user.model.UserAccount;

import java.util.Date;

@Data
public class RatingOfTheHostDTO {

    private double rating;
    private String comment;
    private Date dateAdded;
    private UserAccount author;
}
