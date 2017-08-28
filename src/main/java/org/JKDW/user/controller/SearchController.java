package org.JKDW.user.controller;

import lombok.NonNull;
import org.JKDW.user.model.DTO.EventGeneralDTO;
import org.JKDW.user.model.Event;
import org.JKDW.user.model.SearchCriteriaEvents;
import org.JKDW.user.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/search")
public class SearchController{

     private final @NonNull EventService eventService;

    @Autowired
    public SearchController(EventService eventService) {
        this.eventService = eventService;
    }

    /**
     * checks if event has already happened
     * @param
     * @return Boolean
     *
     *
     *
     *
     */
    @RequestMapping(value = "/main",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<EventGeneralDTO>> getAllMatchingEventsToTitile(@RequestBody SearchCriteriaEvents search,
                                                                    Pageable pageable) {
        Page<EventGeneralDTO> events = eventService.getEventsByTitleWithLowerCases(search, pageable);
        if(events != null)
            return new ResponseEntity<>(events, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /**
     * checks if event has already happened
     * @param
     * @return Boolean
     */
    @RequestMapping(value = "/advanced",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<EventGeneralDTO>> getAllMatch1ing2Events(@RequestBody SearchCriteriaEvents search, Pageable pageable){
        Page<EventGeneralDTO> events = eventService.getEventsMatchingToAllExpressions(search, pageable);
        if (events != null)
            return new ResponseEntity<>(events, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
