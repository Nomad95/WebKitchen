package org.JKDW.user.controller;


import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.JKDW.user.model.comment.conventer.CommentConverter;
import org.JKDW.user.model.comment.dto.RatingCommentDTO;
import org.JKDW.user.model.rating.DTO.RatingOfTheHostDTO;
import org.JKDW.user.model.rating.RatingOfTheHost;
import org.JKDW.user.model.rating.converter.RatingOfTheHostDtoToEntityConverter;
import org.JKDW.user.service.RatingOfTheHostService;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/api/rating")
@RequiredArgsConstructor
@Slf4j
public class RatingOfTheHostController {

    private final @NonNull RatingOfTheHostService ratingOfTheHostService;
    private final @NonNull RatingOfTheHostDtoToEntityConverter converter;
    private final @NonNull CommentConverter commentConverter;

    @PostMapping(value = "/create")
    @ResponseBody
    public RatingOfTheHostDTO createRating(@RequestBody RatingOfTheHostDTO ratingOfTheHostDTO) {
        RatingOfTheHost ratingOfTheHost = ratingOfTheHostService
                .createRatingOfTheHost(converter.convertDtoToEntity(ratingOfTheHostDTO));
        return converter.convertEntityToDto(ratingOfTheHost);
    }

    @GetMapping(params = {"userId", "ownerId", "eventId"})
    @ResponseBody
    public RatingOfTheHostDTO getRating(
            @PathParam("eventId") Long eventId,
            @PathParam("userId") Long userId,
            @PathParam("ownerId") Long ownerId){
        RatingOfTheHost rating = ratingOfTheHostService.getRating(eventId, userId, ownerId);
        if(rating != null)
            return converter.convertEntityToDto(rating);

        return null;
    }

    @PostMapping(value = "/comment/{ratingId}")
    @ResponseBody
    public RatingOfTheHostDTO addComment(@PathVariable Long ratingId, @RequestBody RatingCommentDTO ratingCommentDTO){
        RatingOfTheHost rating = ratingOfTheHostService.getRatingById(ratingId);
        rating.getComments().add(commentConverter.convertDtoToEntity(ratingCommentDTO));
        RatingOfTheHost ratingOfTheHost = ratingOfTheHostService.createRatingOfTheHost(rating);
        return converter.convertEntityToDto(ratingOfTheHost);
    }
}
