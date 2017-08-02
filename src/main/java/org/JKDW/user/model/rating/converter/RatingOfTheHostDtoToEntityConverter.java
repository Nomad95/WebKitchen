package org.JKDW.user.model.rating.converter;

import org.JKDW.user.model.rating.RatingOfTheHost;
import org.JKDW.user.model.rating.RatingOfTheHostDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class RatingOfTheHostDtoToEntityConverter implements Converter<RatingOfTheHostDTO, RatingOfTheHost>{

    @Override
    public RatingOfTheHost convert(RatingOfTheHostDTO ratingOfTheHostDTO) {
        RatingOfTheHost ratingOfTheHost = new RatingOfTheHost();
        ratingOfTheHost.setRating(ratingOfTheHostDTO.getRating());
        ratingOfTheHost.setAuthor(ratingOfTheHostDTO.getAuthor());
        ratingOfTheHost.setComment(ratingOfTheHostDTO.getComment());
        ratingOfTheHost.setDateAdded(ratingOfTheHostDTO.getDateAdded());
        return ratingOfTheHost;
    }
}
