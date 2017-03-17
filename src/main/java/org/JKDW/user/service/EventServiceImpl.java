package org.JKDW.user.service;

import org.JKDW.user.model.Event;
import org.JKDW.user.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;
import java.util.IllegalFormatException;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    /**
     * @return returns all events
     */
    @Override
    public List<Event> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events;
    }

    /**
     * @param id an id of event we want to find
     * @return returns found event
     */
    @Override
    public Event getEventById(Long id) {
        Event event = eventRepository.findOne(id);
        return event;
    }

    /**
     * @param event - new event
     * @return newly saved event
     */
    @Override
    public Event createEvent(Event event) {
        Event savedEvent = eventRepository.save(event);
        return savedEvent;
    }

    /**
     * @param event event to be updated
     * @return updated event
     * @throws NoResultException when an event couldn't be found
     */
    @Override
    public Event updateEvent(Event event) throws NoResultException {
        Event foundEvent = eventRepository.findOne(event.getId());
        if (foundEvent == null) {
            throw new NoResultException("Cannot update event. Event doesn't exists");
        }
        Event savedEvent = eventRepository.save(event);
        return savedEvent;
    }

    /**
     * @param id an id of deleting event
     * @throws NoResultException when an event couldn't be found
     */
    @Override
    public void deleteEvent(Long id) throws NoResultException {
        Event foundEvent = eventRepository.findOne(id);
        if (foundEvent == null) {
            throw new NoResultException("Cannot delete event. Event doesn't exists");
        }

        eventRepository.delete(id);
    }

    @Override
    public List<Event> getAllEventsOfType(byte type) throws NoResultException {
        List<Event> foundEvents = eventRepository.findByType(type);
        if (foundEvents == null) {
            throw new NoResultException("Events type: " + type + " couldnt be found.");
        }

        return foundEvents;
    }
}
