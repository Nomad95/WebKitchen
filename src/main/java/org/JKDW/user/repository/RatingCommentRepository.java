package org.JKDW.user.repository;

import org.JKDW.user.model.comment.RatingComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingCommentRepository extends JpaRepository<RatingComment, Long> {

    List<RatingComment> findByRating_Id(Long ratingId);
}
