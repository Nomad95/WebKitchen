package org.JKDW.user.controller;


import org.JKDW.user.model.rating.RatingOfTheHost;
import org.JKDW.user.model.rating.RatingOfTheHostDTO;
import org.JKDW.user.service.RatingOfTheHostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rating")
public class RatingOfTheHostController {

    @Autowired
    private RatingOfTheHostService ratingOfTheHostService;

    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RatingOfTheHost> createUserAccount(@RequestBody RatingOfTheHostDTO ratingOfTheHostDTO) {
        RatingOfTheHost createdRatingOfTheHost = ratingOfTheHostService.createRatingOfTheHost(ratingOfTheHostDTO);
        if (createdRatingOfTheHost == null)
            return new ResponseEntity<>(createdRatingOfTheHost, HttpStatus.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(createdRatingOfTheHost, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RatingOfTheHost>> getAllRatingsOfTheHosts(){
        List<RatingOfTheHost> allRatingsOfTheHost = ratingOfTheHostService.getAllOfTheHosts();
        return new ResponseEntity<>(allRatingsOfTheHost,HttpStatus.OK);
    }
}
