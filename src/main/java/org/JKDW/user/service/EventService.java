package org.JKDW.user.service;

import org.JKDW.user.model.DTO.EventGeneralDTO;
import org.JKDW.user.model.Event;

import javax.naming.SizeLimitExceededException;
import javax.persistence.NoResultException;
import java.util.List;

public interface EventService {

    List<Event> getAllEvents();

    Event getEventById(Long id);

    Event createEvent(Event event);

    Event updateEvent(Event event) throws NoResultException;

    void deleteEvent(Long id) throws NoResultException;

    List<Event> getAllEventsOfType(byte type) throws NoResultException;

    EventGeneralDTO getEventDetails(Long id) throws NoResultException;

    List<EventGeneralDTO> getAllEventsGeneral();

    void bindEventWithUser(String username, Long evntId) throws SizeLimitExceededException;

    boolean checkIfBinded(String username, Long evntId);
}
