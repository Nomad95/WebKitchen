package org.JKDW.user.converter;

import org.JKDW.commons.converter.Converter;
import org.JKDW.user.model.DTO.EventGeneralDTO;
import org.JKDW.user.model.Event;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EventGeneralConverter implements Converter<Event, EventGeneralDTO> {

    @Autowired private UserAccountRepository userAccountRepository;

    @Override
    public EventGeneralDTO convertEntityToDto(Event event) {
        UserAccount foundUserAccount = userAccountRepository.findOne(event.getOwnerId());
        EventGeneralDTO eventGeneralDTO = new EventGeneralDTO(
                event.getId(),
                event.getType(),
                event.getTitle(),
                event.getTime(),
                event.getDate(),
                event.getDish_kind(),
                event.getDish_name(),
                event.getPeople_quantity(),
                event.getPeople_remaining(),
                foundUserAccount.getId().intValue(),
                foundUserAccount.getUsername(),
                foundUserAccount.getNick());
        return eventGeneralDTO;
    }

    @Override
    public Event convertDtoToEntity(EventGeneralDTO eventGeneralDTO) {
        UserAccount foundUserAccount = userAccountRepository.findOne(eventGeneralDTO.getId());
        Event event = new Event();
        event.setId(eventGeneralDTO.getId());
        event.setType(eventGeneralDTO.getType());
        event.setTitle(eventGeneralDTO.getTitle());
        event.setTime(eventGeneralDTO.getTime());
        event.setDate(eventGeneralDTO.getDate());
        event.setDish_kind(eventGeneralDTO.getDish_kind());
        event.setDish_name(eventGeneralDTO.getDish_name());
        event.setPeople_quantity(eventGeneralDTO.getPeople_quantity());
        event.setPeople_remaining(eventGeneralDTO.getPeople_remaining());
        event.setOwnerId(foundUserAccount.getId());

        return event;
    }
}
