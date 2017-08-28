package org.JKDW.user.service.comment.impl;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.JKDW.user.model.comment.RatingComment;
import org.JKDW.user.repository.RatingCommentRepository;
import org.JKDW.user.service.comment.RatingCommentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingCommentServiceImpl implements RatingCommentService{

    private final @NonNull RatingCommentRepository ratingCommentRepository;

    @Override
    public List<RatingComment> findByRatingId(Long ratingId) {
        return ratingCommentRepository.findByRating_Id(ratingId);
    }

    @Override
    public RatingComment createComment(RatingComment ratingComment) {
        return ratingCommentRepository.save(ratingComment);
    }
}
