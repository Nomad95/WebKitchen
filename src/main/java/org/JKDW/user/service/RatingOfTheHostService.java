package org.JKDW.user.service;

import org.JKDW.user.model.rating.RatingOfTheHost;
import org.JKDW.user.model.rating.DTO.RatingOfTheHostDTO;

import java.util.List;

public interface RatingOfTheHostService {

    RatingOfTheHost createRatingOfTheHost(RatingOfTheHostDTO ratingOfTheHostDTO);

    List<RatingOfTheHost> getAllRatingsOfTheHosts();
}
