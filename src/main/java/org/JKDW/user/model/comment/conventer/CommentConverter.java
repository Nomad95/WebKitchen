package org.JKDW.user.model.comment.conventer;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.JKDW.commons.converter.Converter;
import org.JKDW.user.model.comment.RatingComment;
import org.JKDW.user.model.comment.dto.RatingCommentDTO;
import org.JKDW.user.model.rating.DTO.UserMinimalDTO;
import org.JKDW.user.service.RatingOfTheHostService;
import org.JKDW.user.service.UserAccountService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentConverter implements Converter<RatingComment, RatingCommentDTO> {

    private final @NonNull UserAccountService userAccountService;
    private final @NonNull RatingOfTheHostService ratingService;

    @Override
    public RatingCommentDTO convertEntityToDto(RatingComment ratingComment) {
        RatingCommentDTO ratingCommentDTO = new RatingCommentDTO();
        ratingCommentDTO.setId(ratingComment.getId());
        ratingCommentDTO.setRatingId(ratingComment.getRating().getId());
        ratingCommentDTO.setText(ratingComment.getText());
        ratingCommentDTO.setUser(UserMinimalDTO.fromUserAccount(ratingComment.getUser()));

        return ratingCommentDTO;
    }

    @Override
    public RatingComment convertDtoToEntity(RatingCommentDTO ratingCommentDTO) {
        RatingComment ratingComment = new RatingComment();
        ratingComment.setId(ratingCommentDTO.getId());
        ratingComment.setRating(ratingService.getRatingById(ratingCommentDTO.getRatingId()));
        ratingComment.setText(ratingCommentDTO.getText());
        ratingComment.setUser(userAccountService.getUserAccountById(ratingCommentDTO.getUser().getId()));

        return ratingComment;
    }
}
