package org.JKDW.user.model.rating.converter;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.JKDW.commons.converter.Converter;
import org.JKDW.user.model.rating.DTO.RatingOfTheHostDTO;
import org.JKDW.user.model.rating.RatingOfTheHost;
import org.JKDW.user.service.EventService;
import org.JKDW.user.service.UserAccountService;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RatingOfTheHostDtoToEntityConverter implements Converter<RatingOfTheHost,RatingOfTheHostDTO> {

    private final @NonNull UserAccountService userAccountService;
    private final @NonNull EventService eventService;

    @Override
    public RatingOfTheHostDTO convertEntityToDto(RatingOfTheHost ratingOfTheHost) {
        return null;
    }

    @Override
    public RatingOfTheHost convertDtoToEntity(RatingOfTheHostDTO ratingOfTheHostDTO) {
        RatingOfTheHost ratingOfTheHost = new RatingOfTheHost();
        ratingOfTheHost.setId(ratingOfTheHostDTO.getId());
        ratingOfTheHost.setRating(ratingOfTheHostDTO.getRating());
        ratingOfTheHost.setAuthor(userAccountService.getUserAccountById(ratingOfTheHostDTO.getAuthor().getId()));
        ratingOfTheHost.setComment(ratingOfTheHostDTO.getComment());
        //ratingOfTheHost.setCreatedDate(ratingOfTheHostDTO.getId());
        ratingOfTheHost.setEvent(eventService.getEventById(ratingOfTheHostDTO.getEvent().getId()));
        ratingOfTheHost.setHost(userAccountService.getUserAccountById(ratingOfTheHostDTO.getHost().getId()));
        ratingOfTheHost.setResponseComment(ratingOfTheHostDTO.getResponseComment());
        return ratingOfTheHost;
    }
}
