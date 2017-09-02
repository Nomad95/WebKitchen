package org.JKDW.user.service;

import org.JKDW.user.model.rating.RatingOfTheHost;

import java.util.List;

public interface RatingOfTheHostService {

    RatingOfTheHost createRatingOfTheHost(RatingOfTheHost ratingOfTheHost);

    RatingOfTheHost getRating(Long eventId, Long authorId, Long hostId);

    RatingOfTheHost getRatingById(Long ratingId);

    List<RatingOfTheHost> findByEventId(Long eventId);

}
