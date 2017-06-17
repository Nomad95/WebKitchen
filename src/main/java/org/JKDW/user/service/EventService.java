package org.JKDW.user.service;

import javassist.NotFoundException;
import org.JKDW.user.model.DTO.EventForOwnerDTO;
import org.JKDW.user.model.DTO.EventGeneralDTO;
import org.JKDW.user.model.Event;

import javax.naming.SizeLimitExceededException;
import javax.persistence.NoResultException;
import java.util.List;
import java.util.Set;

public interface EventService {

    List<Event> getAllEvents();

    Event getEventById(Long id);

    Event createEvent(Event event);

    Event updateEvent(Event event) throws NoResultException;

    void deleteEvent(Long id) throws NoResultException;

    List<Event> getAllEventsOfType(byte type) throws NoResultException;

    EventGeneralDTO getEventDetails(Long id) throws NoResultException;

    EventGeneralDTO getEventDetailsByTitle(String title) throws NoResultException;

    List<EventGeneralDTO> getAllEventsGeneral();

    void bindEventWithUser(String username, Long evntId) throws SizeLimitExceededException;

    boolean checkIfBound(String username, Long evntId);

    List<EventForOwnerDTO> getEventsCreatedByUserId(Long id);

    boolean acceptId(Long eventId,Long userAccountId) throws NotFoundException;

    long[] getAcceptedIdsList(Long eventId) throws NotFoundException;

    Event rejectUserParticipationRequest(Long eventId, Long userId,Long userDetailsId) throws NotFoundException;

    String getEventOwnerUsername(Long eventId) throws NotFoundException;

}
