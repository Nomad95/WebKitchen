package org.JKDW.user.controller;

import org.JKDW.user.model.DTO.EventForOwnerDTO;
import org.JKDW.user.model.DTO.EventGeneralDTO;
import org.JKDW.user.model.Event;
import org.JKDW.user.service.EventService;
import org.JKDW.user.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.SizeLimitExceededException;
import java.util.List;

@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    private EventService eventService;


    /**
     * @return all events
     */
    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Event>> getEvents() {
        List<Event> events = eventService.getAllEvents();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    /**
     *
     * @return all general details of all events
     */
    @RequestMapping(value = "/general/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EventGeneralDTO>> getEventsDetails() {
        List<EventGeneralDTO> events = eventService.getAllEventsGeneral();
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    /**
     * @param id type of event
     * @return all events of provided type
     */
    @RequestMapping(value = "/all/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Event>> getEventsByType(@PathVariable("id") byte id) {
        List<Event> events = eventService.getAllEventsOfType(id);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    /**
     * @param id id of event we want to find
     * @return one event found by specified id
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Event> getOneEvent(@PathVariable("id") Long id) {
        Event event = eventService.getEventById(id);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    /**
     *
     * @param id if of event we want to find
     * @return this method returns a DTO that contains
     * general information about an event
     */
    @RequestMapping(value = "/detailed/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EventGeneralDTO> getOneEventDetails(@PathVariable("id") Long id) {
        EventGeneralDTO event = eventService.getEventDetails(id);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    /**
     * @param event we want to create
     * @return created and saved event
     */
    @RequestMapping(
            value = "/create", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = eventService.createEvent(event);
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    /**
     * @param event we want to update
     * @return an updated event
     */
    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<Event> updateEvent(@RequestBody Event event) {
        Event updatedEvent = eventService.updateEvent(event);
        return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
    }

    /**
     * @param id id of deleting event
     * @return ok if ok
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteEvent(@PathVariable("id") Long id) {
        eventService.deleteEvent(id);
        return new ResponseEntity(HttpStatus.OK);
    }


    /**
     * Binds uder with Event
     *
     * @param username
     * @param evntid
     * @return status
     */
    @RequestMapping(value = "/bind/{username}/{evntid}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity bindEventWithUser(@PathVariable("username") String username,
                                            @PathVariable("evntid") Long evntid) {
        try {
            eventService.bindEventWithUser(username, evntid);
        } catch (SizeLimitExceededException e) {
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(HttpStatus.OK);
    }


    /**
     * checks if user id bound to event
     *
     * @param username
     * @param evntid
     * @return
     */
    @RequestMapping(value = "/check/{username}/{evntid}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> checkIfUserIsBound(@PathVariable("username") String username,
                                                      @PathVariable("evntid") Long evntid) {
        if (eventService.checkIfBinded(username, evntid))
            return new ResponseEntity<>(new Boolean("true"), HttpStatus.OK);
        return new ResponseEntity<>(new Boolean("false"), HttpStatus.OK);
    }

    /**
     * Finds info about events created by user with provided id and info about participants
     * @param id of user/ event owner
     * @return list of event+participants. see DTO for more
     */
    @RequestMapping(value = "/userevents/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EventForOwnerDTO>> getAllUserEventsAndParticipants(@PathVariable("id") Long id){
        return new ResponseEntity<>(eventService.getEventsCreatedByUserId(id),HttpStatus.OK);
    }

}
