package org.JKDW.user.model.rating.DTO;

import com.google.common.collect.Lists;
import lombok.Data;
import org.JKDW.user.model.comment.dto.RatingCommentDTO;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Data
public class RatingOfTheHostDTO {

    private Long id;

    private Integer rating;

    private Date createdDate;

    @NotNull
    private EventRatingDTO event;

    @NotNull
    private UserMinimalDTO author;

    @NotNull
    private UserMinimalDTO host;

    private List<RatingCommentDTO> comments = Lists.newArrayList();
}
