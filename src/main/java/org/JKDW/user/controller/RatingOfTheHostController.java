package org.JKDW.user.controller;


import org.JKDW.user.model.rating.DTO.RatingOfTheHostDTO;
import org.JKDW.user.model.rating.RatingOfTheHost;
import org.JKDW.user.service.RatingOfTheHostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rating")
public class RatingOfTheHostController {

    @Autowired
    private RatingOfTheHostService ratingOfTheHostService;

    @PostMapping(value = "/create")
    public ResponseEntity<RatingOfTheHost> createUserAccount(@RequestBody RatingOfTheHostDTO ratingOfTheHostDTO) {
        RatingOfTheHost createdRatingOfTheHost = ratingOfTheHostService.createRatingOfTheHost(ratingOfTheHostDTO);
        if (createdRatingOfTheHost == null)
            return new ResponseEntity<>(createdRatingOfTheHost, HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(createdRatingOfTheHost, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RatingOfTheHost>> getAllRatingsOfTheHosts(){
        List<RatingOfTheHost> allRatingsOfTheHost = ratingOfTheHostService.getAllRatingsOfTheHosts();
        return new ResponseEntity<>(allRatingsOfTheHost,HttpStatus.OK);
    }
}
