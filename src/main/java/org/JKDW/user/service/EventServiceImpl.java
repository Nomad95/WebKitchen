package org.JKDW.user.service;

import javassist.NotFoundException;
import org.JKDW.user.model.DTO.EventForOwnerDTO;
import org.JKDW.user.model.DTO.EventGeneralDTO;
import org.JKDW.user.model.DTO.UserAccountForEventOwnerDTO;
import org.JKDW.user.model.Event;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.UserDetails;
import org.JKDW.user.repository.EventRepository;
import org.JKDW.user.repository.UserAccountRepository;
import org.JKDW.user.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.SizeLimitExceededException;
import javax.persistence.NoResultException;
import java.util.*;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

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
            throw new NoResultException("Cannot update event. Event doesn't exist");
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

    /**
     * @param type of event
     * @return list of events with specified type
     * @throws NoResultException
     */
    @Override
    public List<Event> getAllEventsOfType(byte type) throws NoResultException {
        List<Event> foundEvents = eventRepository.findByType(type);
        if (foundEvents == null) {
            throw new NoResultException("Events type: " + type + " couldnt be found.");
        }

        return foundEvents;
    }

    /**
     * @param id
     * @return Basic information about event
     * is used to display in a event list
     * @throws NoResultException
     */
    @Override
    public EventGeneralDTO getEventDetails(Long id) throws NoResultException {
        Event foundEvent = eventRepository.findOne(id);
        if (foundEvent == null) {
            throw new NoResultException("Event couldnt be found.");
        }
        return new EventGeneralDTO(
                foundEvent.getId(),
                foundEvent.getType(),
                foundEvent.getTitle(),
                foundEvent.getTime(),
                foundEvent.getDate(),
                foundEvent.getDish_kind(),
                foundEvent.getDish_name(),
                foundEvent.getPeople_quantity(),
                foundEvent.getPeople_remaining()
        );
    }

    /**
     * @return returns general details of all events
     */
    @Override
    public List<EventGeneralDTO> getAllEventsGeneral() {
        List<Event> allEvents = eventRepository.findAll();
        List<EventGeneralDTO> eventsDetails = new ArrayList<>();
        for (Event event : allEvents) {
            eventsDetails.add(new EventGeneralDTO(
                    event.getId(),
                    event.getType(),
                    event.getTitle(),
                    event.getTime(),
                    event.getDate(),
                    event.getDish_kind(),
                    event.getDish_name(),
                    event.getPeople_quantity(),
                    event.getPeople_remaining()
            ));
        }
        return eventsDetails;
    }

    /**
     * Binds user with event
     *
     * @param username username
     * @param evntId   event id
     */
    @Override
    public void bindEventWithUser(String username, Long evntId) throws SizeLimitExceededException, NoResultException {
        //find positions
        UserAccount foundUserAccount = userAccountRepository.findByUsername(username);
        if (foundUserAccount == null)
            throw new NoResultException("This account couldn't be found");
        UserDetails foundUserDetails = userDetailsRepository.findByUserAccount(foundUserAccount);
        Event foundEvent = eventRepository.findOne(evntId);
        if (foundEvent == null)
            throw new NoResultException("This event couldn't be found");

        //add account in event
        List<UserDetails> accounts = foundEvent.getAccounts();
        if (accounts == null)
            accounts = new ArrayList<>();
        else {
            if (accounts.size() == foundEvent.getPeople_quantity())
                throw new SizeLimitExceededException("This event has reached its people capacity");
        }
        accounts.add(foundUserDetails);
        foundEvent.setAccounts(accounts);

        //add event in account
        List<Event> events = foundUserDetails.getEvents();
        if (events == null)
            events = new ArrayList<>();
        events.add(foundEvent);
        //decrease nmber of remaining ppl
        int people_remaining = foundEvent.getPeople_remaining();
        if (people_remaining == 0)//double checking vacancy
            throw new SizeLimitExceededException("This event has reached its people capacity");
        people_remaining--;
        foundEvent.setPeople_remaining(people_remaining);
        foundUserDetails.setEvents(events);

        //save data
        userDetailsRepository.save(foundUserDetails);
        eventRepository.save(foundEvent);
    }

    /**
     * One user cannot be bound twice to one event,
     * so we perform a check
     *
     * @param username
     * @param evntId
     * @return true if is arleady bound/false if not
     */
    @Override
    public boolean checkIfBound(String username, Long evntId) {
        //find positions
        UserAccount foundUserAccount = userAccountRepository.findByUsername(username);
        if (foundUserAccount == null)
            throw new NoResultException("This account couldn't be found");
        UserDetails foundUserDetails = userDetailsRepository.findByUserAccount(foundUserAccount);
        Event foundEvent = eventRepository.findOne(evntId);
        if (foundEvent == null)
            throw new NoResultException("This event couldn't be found");

        //check if id's exists
        List<UserDetails> accounts = foundEvent.getAccounts();
        Long id = foundUserDetails.getId();
        for (UserDetails account : accounts) {
            if (id.equals(account.getId()))
                return true;
        }
        return false;
    }

    /**
     * Finds info about events created by user with provided id and info about participants
     * @param id of user (event owner)
     * @return list of events and participants
     */
    @Override
    public List<EventForOwnerDTO> getEventsCreatedByUserId(Long id) {
        List<EventForOwnerDTO> ownerEventsWithAccounts = new ArrayList<>();
        List<Event> foundOwnerEvents = eventRepository.findByOwnerId(id);
        foundOwnerEvents.forEach( event -> ownerEventsWithAccounts.add(
                new EventForOwnerDTO(
                        event.getId(),
                        event.getType(),
                        event.getTitle(),
                        event.getDate(),
                        event.getDish_name(),
                        event.getDish_kind(),
                        event.getPeople_quantity(),
                        event.getPeople_remaining(),
                        event.getAcceptedIds().stream().mapToLong(l -> l).toArray(),
                        processAccountsParticipatingInEvent(event.getAccounts()))
        ));
        return ownerEventsWithAccounts;
    }

    /**
     * Methos adds userAccountId to event accepted list
     * @param eventId event ref
     * @param userAccountId acc id we want to add to eventId
     * @throws NotFoundException when event couldnt be found
     */
    @Override
    public boolean acceptId(Long eventId, Long userAccountId) throws NotFoundException {
        Event foundEvent = eventRepository.findOne(eventId);
        if(foundEvent == null)
            throw new NotFoundException("Event with id = "+eventId+" couldn't be found");
        Set<Long> acceptedIds = foundEvent.getAcceptedIds();
        //initialize set if null
        if(acceptedIds == null)
            acceptedIds = new HashSet<>();
        //add id to list and update event
        acceptedIds.add(userAccountId);
        foundEvent.setAcceptedIds(acceptedIds);
        eventRepository.save(foundEvent);
        return true;
    }

    /**
     * Returns list of ids accepted in specified event
     * @param eventId event id
     * @return List of accepted ids
     * @throws NotFoundException when event couldnt be found
     */
    @Override
    public long[] getAcceptedIdsList(Long eventId) throws NotFoundException {
        Event foundEvent = eventRepository.findOne(eventId);
        if(foundEvent == null)
            throw new NotFoundException("Event with id = "+eventId+" couldn't be found");
        Set<Long> acceptedIds = foundEvent.getAcceptedIds();
        if(acceptedIds == null)
            return new long[1];
        return acceptedIds.stream().mapToLong(l -> l).toArray();
    }


    /**
     * Removes id from event's accepted id, user from event and event from user
     * @param eventId event id
     * @param userAccountId user acc id
     * @param userDetailsId user details id
     * @return updated event
     */
    @Override
    public Event rejectUserParticipationRequest(Long eventId, Long userAccountId, Long userDetailsId)
            throws NotFoundException {
        Event foundEvent = eventRepository.findOne(eventId);
        if(foundEvent == null)
            throw new NoResultException("Event with id: "+ eventId +" couldn't be found");
        UserDetails foundUserDetails = userDetailsRepository.findOne(userDetailsId);
        if(foundUserDetails == null)
            throw new NoResultException("User with id: "+ userDetailsId +" couldn't be found");

        //remove id from acceptedIds (if was accepted) (use iterator when removing)
        removeIdFromEventAcceptedIds(userAccountId, foundEvent);

        //add free space to event
        foundEvent.setPeople_remaining(foundEvent.getPeople_remaining()+1);

        //remove user from participation
        removeUserFromEvent(foundEvent, foundUserDetails);

        //remove users event (use iterator when removing)
        removeEventReferenceFromUserDetails(eventId, foundUserDetails);

        //update
        Event savedUserEvent = eventRepository.save(foundEvent);
        userDetailsRepository.save(foundUserDetails);

        //TODO: send message to user about refuse

        return savedUserEvent;
    }

    /**
     * Removes event ref from user details. Used in rejectUserParticipationRequest
     */
    private void removeEventReferenceFromUserDetails(Long eventId, UserDetails foundUserDetails) {
        List<Event> events = foundUserDetails.getEvents();
        Iterator<Event> iterator = events.iterator();
        Long id = null;
        Event next = null;
        while (iterator.hasNext()) {
            next = iterator.next();
            id = next.getId();
            if (id.equals(eventId))
                break;
        }
        if(id != null && next != null)
            events.remove(next);
        foundUserDetails.setEvents(events);
    }

    /**
     * Removes user from event. Used in rejectUserParticipationRequest
     */
    private void removeUserFromEvent(Event foundEvent, UserDetails foundUserDetails) {
        List<UserDetails> joinedAccounts = foundEvent.getAccounts();
        joinedAccounts.remove(foundUserDetails);
        foundEvent.setAccounts(joinedAccounts);
    }

    /**
     * Removes id from accepted ids. Used in rejectUserParticipationRequest
     */
    private void removeIdFromEventAcceptedIds(Long userAccountId, Event foundEvent) {
        Set<Long> acceptedIds = foundEvent.getAcceptedIds();
        Iterator<Long> it = acceptedIds.iterator();
        Long userId = -1L;
        while (it.hasNext()){
            userId = it.next();
            if(userId.equals(userAccountId))
                break;
        }
        if(userId != -1L)
            acceptedIds.remove(userId);
        foundEvent.setAcceptedIds(acceptedIds);
    }


    /**
     * Helper method extracts participants useraccounts from event
     * @param userDetails list of user details from event
     * @return list of necessary info about users
     */
    private List<UserAccountForEventOwnerDTO> processAccountsParticipatingInEvent(List<UserDetails> userDetails){
        ArrayList<UserAccountForEventOwnerDTO> accountsDTO = new ArrayList<>();
        userDetails.forEach( details ->{
            UserAccount ua = details.getUserAccount();
            accountsDTO.add(new UserAccountForEventOwnerDTO(
                    ua.getId(),
                    ua.getUsername(),
                    ua.getNick(),
                    ua.getIsFilled(),
                    ua.getIsVerified()));
        });
        return accountsDTO;
    }

    /**
     *
     * @param title
     * @return Basic information about event
     * is used to admin panel. I don't know
     * @throws NoResultException
     */

    @Override
    public EventGeneralDTO getEventDetailsByTitle(String title) throws NoResultException {
        Event foundEvent = eventRepository.findDetailsEventByTitle(title);
        if (foundEvent == null) {
            throw new NoResultException("Event details couldnt be found.");
        }
        return new EventGeneralDTO(
                foundEvent.getId(),
                foundEvent.getType(),
                foundEvent.getTitle(),
                foundEvent.getTime(),
                foundEvent.getDate(),
                foundEvent.getDish_kind(),
                foundEvent.getDish_name(),
                foundEvent.getPeople_quantity(),
                foundEvent.getPeople_remaining()
        );
    }
}
