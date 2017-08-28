package org.JKDW.user.service.comment;

import org.JKDW.user.model.comment.RatingComment;

import java.util.List;

public interface RatingCommentService {

    List<RatingComment> findByRatingId(Long ratingId);

    RatingComment createComment(RatingComment ratingComment);
}
