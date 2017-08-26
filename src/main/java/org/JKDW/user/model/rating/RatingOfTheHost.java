package org.JKDW.user.model.rating;

import lombok.Data;
import org.JKDW.user.model.Event;
import org.JKDW.user.model.UserAccount;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data
public class RatingOfTheHost {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer rating;

    @Size(max = 5000)
    private String comment;

    @Size(max = 5000)
    private String responseComment;

    private Date createdDate;

    @NotNull
    @ManyToOne
    private Event event;

    @NotNull
    @ManyToOne
    private UserAccount author;

    @NotNull
    @ManyToOne
    private UserAccount host;

    @PrePersist
    private void setCreatedDateAudit(){
        this.createdDate = new Date();
    }
}
