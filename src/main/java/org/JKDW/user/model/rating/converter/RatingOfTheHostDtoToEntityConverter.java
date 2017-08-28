package org.JKDW.user.model.rating.converter;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.JKDW.commons.converter.Converter;
import org.JKDW.user.model.comment.dto.RatingCommentDTO;
import org.JKDW.user.model.rating.DTO.EventRatingDTO;
import org.JKDW.user.model.rating.DTO.RatingOfTheHostDTO;
import org.JKDW.user.model.rating.DTO.UserMinimalDTO;
import org.JKDW.user.model.rating.RatingOfTheHost;
import org.JKDW.user.service.EventService;
import org.JKDW.user.service.UserAccountService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class RatingOfTheHostDtoToEntityConverter implements Converter<RatingOfTheHost,RatingOfTheHostDTO> {

    private final @NonNull UserAccountService userAccountService;
    private final @NonNull EventService eventService;

    @Override
    public RatingOfTheHostDTO convertEntityToDto(RatingOfTheHost ratingOfTheHost) {
        RatingOfTheHostDTO ratingOfTheHostDTO = new RatingOfTheHostDTO();
        ratingOfTheHostDTO.setId(ratingOfTheHost.getId());
        ratingOfTheHostDTO.setAuthor(UserMinimalDTO.fromUserAccount(ratingOfTheHost.getAuthor()));
        ratingOfTheHostDTO.setCreatedDate(ratingOfTheHost.getCreatedDate());
        ratingOfTheHostDTO.setHost(UserMinimalDTO.fromUserAccount(ratingOfTheHost.getHost()));
        ratingOfTheHostDTO.setEvent(EventRatingDTO.fromEvent(ratingOfTheHost.getEvent()));
        ratingOfTheHostDTO.setRating(ratingOfTheHost.getRating());
        List<RatingCommentDTO> commentsDto = ratingOfTheHost.getComments().stream()
                .map(RatingCommentDTO::fromRatingComment).collect(Collectors.toList());
        ratingOfTheHostDTO.setComments(commentsDto);

        return ratingOfTheHostDTO;
    }

    @Override
    public RatingOfTheHost convertDtoToEntity(RatingOfTheHostDTO ratingOfTheHostDTO) {
        RatingOfTheHost ratingOfTheHost = new RatingOfTheHost();
        ratingOfTheHost.setId(ratingOfTheHostDTO.getId());
        ratingOfTheHost.setRating(ratingOfTheHostDTO.getRating());
        ratingOfTheHost.setAuthor(userAccountService.getUserAccountById(ratingOfTheHostDTO.getAuthor().getId()));
        ratingOfTheHost.setEvent(eventService.getEventById(ratingOfTheHostDTO.getEvent().getId()));
        ratingOfTheHost.setHost(userAccountService.getUserAccountById(ratingOfTheHostDTO.getHost().getId()));
        return ratingOfTheHost;
    }
}
