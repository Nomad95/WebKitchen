package org.JKDW.user.model.rating;

import com.google.common.collect.Lists;
import lombok.Data;
import org.JKDW.user.model.Event;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.comment.RatingComment;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class RatingOfTheHost {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer rating;

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

    @OneToMany(mappedBy = "rating",cascade = CascadeType.ALL)
    private List<RatingComment> comments = Lists.newArrayList();

    @PrePersist
    private void setCreatedDateAudit(){
        this.createdDate = new Date();
    }
}
