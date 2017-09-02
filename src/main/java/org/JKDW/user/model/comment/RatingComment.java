package org.JKDW.user.model.comment;

import lombok.Data;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.rating.RatingOfTheHost;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data
public class RatingComment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @ManyToOne
    private UserAccount user;

    @NotNull
    @ManyToOne
    private RatingOfTheHost rating;

    @NotNull
    @Size(max = 5000)
    private String text;

    private Date dateCreated;

    @PrePersist
    protected void onCreate() {
        dateCreated = new Date();
    }
}
