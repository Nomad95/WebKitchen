package org.JKDW.user.model.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.JKDW.user.model.comment.RatingComment;
import org.JKDW.user.model.rating.DTO.UserMinimalDTO;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingCommentDTO {

    private Long id;

    @NotNull
    private UserMinimalDTO user;

    @Size(max = 5000)
    @NotNull
    private String text;

    @NotNull
    private Long ratingId;

    private Date dateCreated;

    public static RatingCommentDTO fromRatingComment(RatingComment comment){
        return new RatingCommentDTO(
                comment.getId(),
                UserMinimalDTO.fromUserAccount(comment.getUser()),
                comment.getText(),
                comment.getRating().getId(),
                comment.getDateCreated());
    }
}
