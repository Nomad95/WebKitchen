package org.JKDW.user.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.JKDW.user.model.rating.DTO.RatingOfTheHostDTO;
import org.JKDW.user.model.rating.RatingOfTheHost;
import org.JKDW.user.model.rating.converter.RatingOfTheHostDtoToEntityConverter;
import org.JKDW.user.repository.RatingOfTheHostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingOfTheHostServiceImpl implements RatingOfTheHostService{

    private final @NonNull RatingOfTheHostRepository ratingOfTheHostRepository;
    private final @NonNull RatingOfTheHostDtoToEntityConverter ratingOfTheHostDtoToEntityConverter;

    @Override
    public RatingOfTheHost createRatingOfTheHost(RatingOfTheHostDTO ratingOfTheHostDTO) {
        return ratingOfTheHostRepository.save(ratingOfTheHostDtoToEntityConverter.convertDtoToEntity(ratingOfTheHostDTO));
    }

    @Override
    public List<RatingOfTheHost> getAllRatingsOfTheHosts() {
        return ratingOfTheHostRepository.findAll();
    }
}
