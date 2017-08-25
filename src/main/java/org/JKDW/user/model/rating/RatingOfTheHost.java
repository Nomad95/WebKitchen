package org.JKDW.user.model.rating;

import lombok.Data;
import org.JKDW.user.model.UserAccount;

import javax.persistence.*;
import java.util.Date;

@Entity
public @Data class  RatingOfTheHost {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double rating;
    private String comment;
    private Date dateAdded;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserAccount author;

}
