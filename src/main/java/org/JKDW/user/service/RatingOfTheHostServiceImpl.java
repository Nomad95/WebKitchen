package org.JKDW.user.service;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.JKDW.user.model.converter.RatingOfTheHostDtoToEntityConverter;
import org.JKDW.user.model.rating.RatingOfTheHost;
import org.JKDW.user.model.rating.RatingOfTheHostDTO;
import org.JKDW.user.repository.RatingOfTheHostRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class RatingOfTheHostServiceImpl implements RatingOfTheHostService{

    private final @NonNull RatingOfTheHostRepository ratingOfTheHostRepository;
    private final @NonNull RatingOfTheHostDtoToEntityConverter ratingOfTheHostDtoToEntityConverter;

    @Override
    public RatingOfTheHost createRatingOfTheHost(RatingOfTheHostDTO ratingOfTheHostDTO) {
        return ratingOfTheHostRepository.save(ratingOfTheHostDtoToEntityConverter.convert(ratingOfTheHostDTO));
    }

    @Override
    public List<RatingOfTheHost> getAllOfTheHosts() {
        return ratingOfTheHostRepository.findAll();
    }
}
