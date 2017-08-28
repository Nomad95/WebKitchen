package org.JKDW.user.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.JKDW.user.model.rating.RatingOfTheHost;
import org.JKDW.user.repository.RatingOfTheHostRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RatingOfTheHostServiceImpl implements RatingOfTheHostService{

    private final @NonNull RatingOfTheHostRepository ratingOfTheHostRepository;

    @Override
    public RatingOfTheHost createRatingOfTheHost(RatingOfTheHost ratingOfTheHost) {
        return ratingOfTheHostRepository.save(ratingOfTheHost);
    }

    @Override
    public RatingOfTheHost getRating(Long eventId, Long authorId, Long hostId) {
        log.info("find rating with eventid: {} , authorId: {} , hostId: {}",eventId,authorId,hostId);
        return ratingOfTheHostRepository.findRatingForUserAndEvent(eventId, authorId, hostId);
    }

    @Override
    public RatingOfTheHost getRatingById(Long ratingId) {
        log.info("find rating with id: {}",ratingId);
        return ratingOfTheHostRepository.findOne(ratingId);
    }
}
