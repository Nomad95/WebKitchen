package org.JKDW.user.model.rating.DTO;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
public class RatingOfTheHostDTO {

    private Long id;

    private Integer rating;

    @Size(max = 5000)
    private String comment;

    @Size(max = 5000)
    private String responseComment;

    private Date createdDate;

    @NotNull
    private EventRatingDTO event;

    @NotNull
    private UserMinimalDTO author;

    @NotNull
    private UserMinimalDTO host;
}
